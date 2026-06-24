from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf_report(
    analysis,
    output_path
):

    doc = SimpleDocTemplate(output_path)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "NyayaAI Contract Analysis Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 12))

    content.append(
        Paragraph(
            f"Risk Score: {analysis.get('risk_score', 0)}",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            f"Risk Level: {analysis.get('risk_level', 'Unknown')}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 12))

    content.append(
        Paragraph(
            analysis.get("summary", ""),
            styles["BodyText"]
        )
    )

    content.append(Spacer(1, 12))

    content.append(
        Paragraph(
            "Detected Issues",
            styles["Heading2"]
        )
    )

    for issue in analysis.get("issues", []):

        content.append(
            Paragraph(
                f"<b>{issue.get('name')}</b>",
                styles["BodyText"]
            )
        )

        content.append(
            Paragraph(
                issue.get("reason", ""),
                styles["BodyText"]
            )
        )

        content.append(Spacer(1, 6))

    doc.build(content)