# Start all of the services manually

```bash
sudo lsof -ti:27017 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:3130 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:3000 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:5000 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:5001 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:5002 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:5173 | while read pid; do sudo kill -9 $pid; done
sudo lsof -ti:4173 | while read pid; do sudo kill -9 $pid; done
```

```bash
cd backend
mkdir -p data/db
mongod --dbpath='data/db'
```

```bash
npm install
cd backend/api_gateway
npm install
npm run dev
```

```bash
cd backend/auth_service
npm install
npm run dev
```

```bash
python -m venv venv
source venv/bin/activate
pip install pytest pandas scrapy scrapyscript beautifulsoup4 selenium flask flask_cors tqdm asyncio pymongo
```

```bash
source venv/bin/activate
python backend/verification_service/src/main.py
```

```bash
source venv/bin/activate
python backend/database_functions/database_Prescriptions.py
```

```bash
source venv/bin/activate
python backend/scrapeDescription.py
```

```bash
cd frontend
npm run build
npm run preview
```

```bash
docker-compose up --remove-orphans
docker-compose build
```