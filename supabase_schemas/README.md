## Supabase Schema Log

All SQL statements that shape the PersonalMe database live in this folder. Each file follows the pattern `supabase_schemas/SQL_Schemas/NN_description.sql` so we can track order and scope.

Conventions:

1. **Status banner** – every file starts with `-- STATUS: Not yet run on Supabase`. After executing a script, replace that text with `-- STATUS: Successfully run on Supabase` so we know what is applied.
2. **Single responsibility** – group related tables or migrations in their own file (core tables, extended tables, storage policies, seeds, etc.).
3. **Immutable history** – never edit a file after it has been marked as run. Instead, add a new sequenced file so we always have an audit trail.

To execute:

```sql
-- Example: run inside the Supabase SQL editor
\i supabase_schemas/SQL_Schemas/01_core_schema.sql
\i supabase_schemas/SQL_Schemas/02_extended_schema.sql
```

Keep this folder in sync with whatever has been applied to the Supabase project so future debugging and migrations stay simple.
