
# Sales Insights API

## Setup
1. Clone repo
2. Copy `.env.example` to `.env` and set your OpenAI API key
3. `npm install`
4. `npm run dev` (development) or `npm run build && npm start` (production)

## API
- **POST** `/sales/insights`  
  - Body: JSON array of sales records  
  - Returns: `{ metrics, summary }`