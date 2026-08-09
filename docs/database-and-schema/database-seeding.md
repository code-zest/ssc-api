# Database Seeding

This project uses Prisma to seed the database with initial and test data. 
There are multiple seed files available to populate different subjects and scenarios.

## Available Seed Files

- `prisma/seed.ts` - Main seed file that populates roles (Super Admin, Admin, Student) and the Mathematics (CGL) subject along with sample chapters, lessons, and questions.
- `prisma/seed-biology.ts` - Secondary seed file that populates the Biology (CGL) subject with cell biology chapters, video lessons, and questions.

## Running the Seeds

### Run the Main Seed

The default Prisma seed command runs `prisma/seed.ts`. Use this for first-time database setup:
```bash
npx prisma db seed
```

### Run Subject-Specific Seeds (e.g. Biology)

To run a specific seed file like Biology, you can execute it directly using `ts-node`:
```bash
npx ts-node prisma/seed-biology.ts
```

*Note: You may need to ensure `ts-node` is installed or run it via your package manager (`npx ts-node`).*

## When to use these seed files?
- Use the main seed file when spinning up a new local database or resetting your database.
- Use subject-specific seed files to populate extra content for testing UI rendering of multiple subjects, practice sets, and mock tests without manually entering the data through the Admin Dashboard.
- You can create more subject seed files (e.g., `seed-physics.ts`, `seed-history.ts`) following the same pattern as `seed-biology.ts`.
