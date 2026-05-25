# TODO - Convert MongoDB to MongoDB Atlas

- [x] Inspect backend config and Docker setup for MongoDB usage


- [x] Update backend/src/config/database.ts to require MONGODB_URI and remove MongoMemoryServer localhost fallback
- [x] Update docker-compose.yml to remove MongoDB service for Atlas deployment (optionally keep a local profile)

- [ ] Update README.md / env docs to use MongoDB Atlas `mongodb+srv://...`
- [ ] (Optional) Update frontend env examples if needed (API URL only; no DB changes required)
- [ ] Run backend tests/start to verify MongoDB connection works with Atlas URI


