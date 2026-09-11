from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume():
    pdf_path = "public/assets/resume/resume.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom styles matching the input PDF typography
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=20,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#111827'),
        spaceAfter=4
    )

    header_links_style = ParagraphStyle(
        'HeaderLinks',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#2563eb'),
        spaceAfter=14
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#0f172a'),
        textTransform='uppercase',
        spaceBefore=10,
        spaceAfter=3,
        borderWidth=0.5,
        borderColor=colors.HexColor('#cbd5e1')
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=4
    )

    bold_label = ParagraphStyle(
        'BoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    item_meta = ParagraphStyle(
        'ItemMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#475569'),
        alignment=TA_RIGHT
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    story = []

    # Title & Links
    story.append(Paragraph("Santosh Kumar Itte", title_style))
    story.append(Paragraph("GitHub | LinkedIn | Portfolio | santoshkumaritte7@gmail.com", header_links_style))

    def make_section_header(title):
        t = Table(
            [[Paragraph(f"<b>{title}</b>", section_heading)]],
            colWidths=[532],
            rowHeights=[20]
        )
        t.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 2),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('LINEBELOW', (0,0), (-1,-1), 0.75, colors.HexColor('#334155')),
        ]))
        return t

    # SUMMARY
    story.append(make_section_header("SUMMARY"))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Passionate software enthusiast with expertise in AI/ML, Data Science, and Web Development. "
        "Constantly exploring innovative technologies and developing solutions to real-world problems.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # SKILLS
    story.append(make_section_header("SKILLS"))
    story.append(Spacer(1, 4))
    skills_data = [
        [Paragraph("<b>Programming Languages</b>", bold_label), Paragraph("JavaScript, Python, HTML, CSS", body_style)],
        [Paragraph("<b>Web Technologies</b>", bold_label), Paragraph("Flask, Tailwind CSS, Vite", body_style)],
        [Paragraph("<b>AI/ML Technologies</b>", bold_label), Paragraph("Machine learning algorithms, Deep learning", body_style)],
        [Paragraph("<b>Core Skills</b>", bold_label), Paragraph("DSA, Problem Solving, Debugging", body_style)],
        [Paragraph("<b>Soft Skills</b>", bold_label), Paragraph("Strategic Thinking, Creativity, Communication", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[150, 382])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 6))

    # PROJECTS
    story.append(make_section_header("PROJECTS"))
    story.append(Spacer(1, 4))

    # Project 1: MNIST
    p1_header = Table([
        [Paragraph("<b>MNIST Digit Classification</b> | <i>Neural Networks | NumPy</i>", item_title),
         Paragraph("Source Code", item_meta)]
    ], colWidths=[432, 100])
    p1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(p1_header)
    story.append(Paragraph("• Developed a two-layer neural network from scratch using NumPy to classify handwritten digits from the MNIST dataset without using deep learning frameworks.", bullet_style))
    story.append(Paragraph("• Implemented the complete forward and backward propagation pipeline, including ReLU activation, Softmax classification, one-hot encoding, and gradient descent optimization.", bullet_style))
    story.append(Paragraph("• Built a custom training and prediction workflow with random parameter initialization, validation split, accuracy evaluation, and digit visualization using Matplotlib.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 2: STUCET
    p2_header = Table([
        [Paragraph("<b>STUCET – EAPCET Papers Hub</b> | <i>Web Development | Supabase</i>", item_title),
         Paragraph("Source Code", item_meta)]
    ], colWidths=[432, 100])
    p2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(p2_header)
    story.append(Paragraph("• Developed a community-driven platform for organizing EAPCET question papers by state, year, date, and shift, with direct access to Google Drive resources.", bullet_style))
    story.append(Paragraph("• Integrated Supabase (PostgreSQL) for persistent storage, enabling students to submit question papers through a form and dynamically retrieve community-contributed content.", bullet_style))
    story.append(Paragraph("• Built and deployed a fully responsive web application using HTML, CSS, and Vanilla JavaScript with Vercel, supporting seamless access across desktop and mobile devices.", bullet_style))
    story.append(Spacer(1, 6))

    # WORK EXPERIENCE
    story.append(make_section_header("WORK EXPERIENCE"))
    story.append(Spacer(1, 4))

    # Exp 1: Hack Culprit
    e1_header = Table([
        [Paragraph("<b>Web Development Intern</b> | Hack Culprit Technologies", item_title),
         Paragraph("July 2026 – Present", item_meta)]
    ], colWidths=[382, 150])
    e1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(e1_header)
    story.append(Paragraph("• Contributing to web development projects as a Web Development Intern, applying practical development skills to build and improve web-based applications.", bullet_style))
    story.append(Paragraph("• Collaborating on real-world development tasks while gaining hands-on experience with web technologies, software development workflows, and project implementation.", bullet_style))
    story.append(Spacer(1, 4))

    # Exp 2: NIMBLUX
    e2_header = Table([
        [Paragraph("<b>Campus Ambassador</b> | NIMBLUX", item_title),
         Paragraph("August 2026 – Present", item_meta)]
    ], colWidths=[382, 150])
    e2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(e2_header)
    story.append(Paragraph("• Representing NIMBLUX on campus, promoting its initiatives and connecting students with relevant opportunities and activities.", bullet_style))
    story.append(Paragraph("• Supporting student outreach and community engagement while developing communication, networking, and leadership skills.", bullet_style))
    story.append(Spacer(1, 4))

    # Exp 3: Volunteer
    e3_header = Table([
        [Paragraph("<b>Student Volunteer / Event Support</b> | DataHack Summit", item_title),
         Paragraph("2026", item_meta)]
    ], colWidths=[382, 150])
    e3_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(e3_header)
    story.append(Paragraph("• Supported session operations, attendee coordination, and technical community engagement during the national summit.", bullet_style))
    story.append(Spacer(1, 6))

    # Page Break for Education & Certifications
    story.append(PageBreak())

    # EDUCATION
    story.append(make_section_header("EDUCATION"))
    story.append(Spacer(1, 4))

    ed1_header = Table([
        [Paragraph("<b>B.Tech in Computer Science and Engineering (AI & ML)</b>", item_title),
         Paragraph("2024 – Present", item_meta)],
        [Paragraph("Krishna Chaitanya Institute of Technology and Sciences", body_style),
         Paragraph("Currently Pursuing", item_meta)]
    ], colWidths=[382, 150])
    ed1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(ed1_header)
    story.append(Spacer(1, 4))

    ed2_header = Table([
        [Paragraph("<b>Intermediate BIEAP</b> at CLR Junior College", item_title),
         Paragraph("2019 – 2021", item_meta)],
        [Paragraph("Marks: 789/1000", body_style),
         Paragraph("", item_meta)]
    ], colWidths=[382, 150])
    ed2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(ed2_header)
    story.append(Spacer(1, 4))

    ed3_header = Table([
        [Paragraph("<b>Class 10th BSEAP</b> at Krupaamrutha High School", item_title),
         Paragraph("2018 – 2019", item_meta)],
        [Paragraph("Marks: 552/600", body_style),
         Paragraph("", item_meta)]
    ], colWidths=[382, 150])
    ed3_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(ed3_header)
    story.append(Spacer(1, 8))

    # CERTIFICATIONS
    story.append(make_section_header("CERTIFICATIONS"))
    story.append(Spacer(1, 4))

    cert1 = Table([
        [Paragraph("• <b>Responsive Web Design</b> | FreeCodeCamp", body_style),
         Paragraph("View", item_meta)]
    ], colWidths=[452, 80])
    cert1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(cert1)

    cert2 = Table([
        [Paragraph("• <b>Python</b> | HackerRank", body_style),
         Paragraph("View", item_meta)]
    ], colWidths=[452, 80])
    cert2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(cert2)

    doc.build(story)
    print("Resume PDF generated successfully at", pdf_path)

if __name__ == '__main__':
    create_resume()
