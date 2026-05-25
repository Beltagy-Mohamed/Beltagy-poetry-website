import os
import datetime

QUOTES_DIR = "content/arabic/quotes"
os.makedirs(QUOTES_DIR, exist_ok=True)

quotes = [
    {
        "filename": "ghassan-ali-othman-challenges.md",
        "title": "تحديات المجتمعات العربية",
        "date": "2023-11-15T10:00:00Z",
        "author": "غسان علي عثمان",
        "topic": "فكر وفلسفة",
        "body": "إنَّ أكبر التحديات التي تواجه المجتمعات العربية لا تتعلق فقط بالمجال السياسي بقدر تعلّقها بتراجع المعرفة، والهزات السلوكية المرتبطة باختلال نظام القيم، وما ينتج عن ذلك من تصدع الهويات إلى الحد الذي يهدد عقائد الأفراد؛ والحل يبدأ من إعادة النظر في مناهج البحث الاجتماعي، والانتقال من الرصد إلى الاستشراف."
    },
    {
        "filename": "beltagy-reading-ideas.md",
        "title": "ولادة الأفكار",
        "date": "2024-01-20T10:00:00Z",
        "author": "بلتاجي الرمحي",
        "topic": "حكمة وتجارب",
        "body": "إنَّ أكبر المُتَعِ هي ولادة الأفكار التي تعقب القراءة."
    }
]

for q in quotes:
    filepath = os.path.join(QUOTES_DIR, q['filename'])
    content = f"""---
title: "{q['title']}"
date: {q['date']}
author: "{q['author']}"
topic: "{q['topic']}"
---

{q['body']}
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Successfully created {len(quotes)} quotes.")
