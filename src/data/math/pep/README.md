# PEP Math Content Data

This directory stores structured math learning content organized by grade and semester:

- `grade-1/semester-1` through `grade-9/semester-2`
- each semester directory contains a `units.json` file
- `schema.ts` defines the shared TypeScript shape for platform consumers

Content policy:

- Treat all records as draft instructional data until `sourceReview.status` is changed to `reviewed`.
- Do not copy textbook prose, examples, diagrams, or exercises directly.
- Prefer public curriculum standards, publicly available knowledge-point outlines, and original platform-authored examples.
- Require human editorial review before publishing to learners.
