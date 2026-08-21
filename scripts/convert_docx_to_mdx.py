from __future__ import annotations

import argparse
import os
import re
from pathlib import Path
from typing import Iterable

from docx import Document
from docx.document import Document as DocumentClass
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph


DRAWING_BLIP_TAG = "{http://schemas.openxmlformats.org/drawingml/2006/main}blip"
HEADING_PREFIX_RE = re.compile(r"^\d+(?:\.\d+)*\.?\s*")
ORDERED_ITEM_RE = re.compile(r"^\d+\.\s+")
INTRO_SECTION_TITLES = {"产品介绍", "Product Introduction"}
TOC_TITLES = {"目录", "Table of Contents"}
MANUAL_NOTES = {
    "使用前请仔细阅读本说明书",
    "Please read this manual carefully before use",
}


def iter_block_items(parent: DocumentClass) -> Iterable[Paragraph | Table]:
    for child in parent.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield Table(child, parent)


def clean_text(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = text.replace("\u200b", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s+\n", "\n", text)
    return text.strip()


def escape_frontmatter(text: str) -> str:
    return text.replace('"', '\\"')


def strip_heading_prefix(text: str) -> str:
    return HEADING_PREFIX_RE.sub("", text).strip()


def sanitize_slug_part(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "document"


def markdown_escape(text: str) -> str:
    text = clean_text(text)
    text = text.replace("|", "\\|")
    return text


def render_table(table: Table) -> list[str]:
    rows = []
    for row in table.rows:
        cells = [markdown_escape(cell.text) for cell in row.cells]
        rows.append(cells)

    if not rows:
        return []

    col_count = max(len(row) for row in rows)
    normalized = [row + [""] * (col_count - len(row)) for row in rows]
    header = normalized[0]
    separator = ["---"] * col_count

    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(separator) + " |",
    ]
    for row in normalized[1:]:
        lines.append("| " + " | ".join(row) + " |")
    return lines


def paragraph_images(paragraph: Paragraph) -> list[tuple[str, bytes]]:
    images: list[tuple[str, bytes]] = []
    seen: set[str] = set()

    for run in paragraph.runs:
        for blip in run._element.iter(DRAWING_BLIP_TAG):
            rel_id = blip.get(qn("r:embed"))
            if not rel_id or rel_id in seen:
                continue
            seen.add(rel_id)
            part = paragraph.part.related_parts[rel_id]
            ext = Path(str(part.partname)).suffix or ".png"
            images.append((ext, part.blob))

    return images


def should_bold_label(text: str, next_text: str) -> bool:
    if not text or not next_text:
        return False
    if len(text) > 18:
        return False
    if "：" in text or ":" in text:
        return False
    if text.startswith(("Q", "A", "*", "·", "【")):
        return False
    if ORDERED_ITEM_RE.match(text):
        return False
    if text.endswith(("。", "；", "！", "？", ".", ":", "：")):
        return False
    return len(next_text) > len(text)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_docx")
    parser.add_argument("output_mdx")
    parser.add_argument("output_image_dir")
    parser.add_argument("--image-url-prefix", required=True)
    args = parser.parse_args()

    input_docx = Path(args.input_docx)
    output_mdx = Path(args.output_mdx)
    output_image_dir = Path(args.output_image_dir)
    output_image_dir.mkdir(parents=True, exist_ok=True)

    doc = Document(str(input_docx))

    title_lines = []
    for paragraph in doc.paragraphs[:8]:
        text = clean_text(paragraph.text)
        if not text:
            continue
        if paragraph.style and paragraph.style.name == "Title":
            title_lines.append(text)

    title = " ".join(title_lines).strip() or input_docx.stem

    blocks = list(iter_block_items(doc))
    seen_first_section = False
    first_body_paragraph = ""
    for block in blocks:
        if not isinstance(block, Paragraph):
            continue
        text = clean_text(block.text)
        if not text:
            continue
        style_name = block.style.name if block.style else ""
        if style_name == "Heading 1" and strip_heading_prefix(text) in INTRO_SECTION_TITLES:
            seen_first_section = True
            continue
        if not seen_first_section:
            continue
        if paragraph_images(block):
            continue
        first_body_paragraph = text
        break
    description = first_body_paragraph[:120] if first_body_paragraph else title

    lines = [
        "---",
        f'title: "{escape_frontmatter(title)}"',
        f'description: "{escape_frontmatter(description)}"',
        "---",
        "",
    ]

    image_counter = 1
    in_toc = False

    for index, block in enumerate(blocks):
        if isinstance(block, Table):
            table_lines = render_table(block)
            if table_lines:
                lines.extend(table_lines)
                lines.append("")
            continue

        text = clean_text(block.text)
        style_name = block.style.name if block.style else ""
        images = paragraph_images(block)

        if style_name == "Heading 1" and strip_heading_prefix(text) in INTRO_SECTION_TITLES:
            in_toc = False

        if text in TOC_TITLES:
            in_toc = True
            continue
        if in_toc:
            continue

        if images:
            for ext, blob in images:
                image_name = f"image-{image_counter:02d}{ext}"
                image_counter += 1
                image_path = output_image_dir / image_name
                image_path.write_bytes(blob)
                lines.append(
                    f'![{title} 插图 {image_counter - 1}]({args.image_url_prefix}/{image_name})'
                )
                lines.append("")
            continue

        if not text:
            continue

        if style_name == "Title":
            continue

        if style_name == "Heading 1":
            lines.append(f"## {strip_heading_prefix(text)}")
            lines.append("")
            continue

        if style_name == "Heading 2":
            lines.append(f"### {strip_heading_prefix(text)}")
            lines.append("")
            continue

        if style_name == "Heading 3":
            lines.append(f"#### {strip_heading_prefix(text)}")
            lines.append("")
            continue

        if text in {"Spatial Multi-Sensor FP400", "User Manual"}:
            continue

        if text in MANUAL_NOTES:
            lines.append(f"> {text}")
            lines.append("")
            continue

        if (
            text.startswith("【")
            and text.endswith("】")
            or text.startswith("[")
            and text.endswith("]")
        ):
            lines.append(f"*{text}*")
            lines.append("")
            continue

        if text.startswith("* "):
            lines.append(f"- {text[2:].strip()}")
            continue

        if text.startswith("·"):
            lines.append(f"- {text[1:].strip()}")
            continue

        if ORDERED_ITEM_RE.match(text):
            lines.append(text)
            continue

        next_text = ""
        for candidate in blocks[index + 1 :]:
            if isinstance(candidate, Paragraph):
                next_text = clean_text(candidate.text)
                if next_text:
                    break
            elif isinstance(candidate, Table):
                break

        if should_bold_label(text, next_text):
            lines.append(f"**{text}**")
            lines.append("")
            continue

        lines.append(text)
        lines.append("")

    content = "\n".join(lines).strip() + "\n"
    output_mdx.parent.mkdir(parents=True, exist_ok=True)
    output_mdx.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
