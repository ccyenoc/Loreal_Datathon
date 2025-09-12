# 📈 Keyword Trend Detection Documentation

This document explains how **velocity**, **engagement_rate**, and **phase classification** are calculated in the simplified keyword trend detection workflow.

---

## 1. Velocity Calculation
Velocity measures the **momentum of keyword mentions** over time. It is computed as the slope of a linear regression line fitted to the keyword’s mentions in the **last 3 months**.

- For each keyword:
  1. Count monthly mentions (`mentions`).
  2. Take the last 3 months of data.
  3. Fit a line: `mentions ~ time_index`.
  4. The slope of this line = **velocity**.

**Interpretation:**
- **Positive velocity** → mentions are increasing.
- **Zero velocity** → stable mentions.
- **Negative velocity** → mentions are decreasing.

---

## 2. Engagement Rate
Engagement rate captures how much users interact with the content associated with a keyword.

- For each video → engagement_rate is pre-calculated (e.g., `(likes + comments + shares) / views`).
- For each keyword → engagement_rate is the **average engagement rate across all videos** that mention the keyword.

**Interpretation:**
- **High engagement rate** → content resonates strongly with audiences.
- **Low engagement rate** → content has limited audience response.

---

## 3. Phase Classification
Each keyword is assigned a **trend phase** based on velocity and engagement:

| Phase      | Condition                                                                 | Meaning                                                         |
|------------|---------------------------------------------------------------------------|-----------------------------------------------------------------|
| **Emerging** | `velocity > 0` and `engagement < median(engagement_rate)`                 | Mentions are rising, but audience engagement is still low.       |
| **Growing**  | `velocity > 0` and `engagement ≥ median(engagement_rate)`                 | Mentions are rising and engagement is strong → trending upward.  |
| **Peaking**  | `velocity ≤ 0` and `engagement ≥ median(engagement_rate)`                 | Mentions are slowing, but engagement is still high.              |
| **Decaying** | `velocity ≤ 0` and `engagement < median(engagement_rate)`                 | Mentions are slowing and engagement is fading → losing traction. |

---

## 4. Ranking Logic (Top 10 Keywords)
After classification, keywords are ranked within each phase:

- **Emerging & Growing** → ranked by **velocity** (higher momentum = higher rank).  
- **Peaking** → ranked by **engagement_rate** (resonating despite slowing mentions).  
- **Decaying** → ranked by **velocity** (more negative slope = faster decline).

---

