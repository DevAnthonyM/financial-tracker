# Generate Alerts Edge Function

This function runs via Supabase Edge Functions + Cron to evaluate spend thresholds and upcoming payments.

### Deploying

1. Install Supabase CLI.
2. From repo root:
   `ash
   supabase functions deploy generate-alerts
   supabase functions secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role SUPABASE_URL=https://your-project.supabase.co
   supabase functions schedule create generate-alerts --cron "0 * * * *"
   `
3. The function queries categories and recurring payments for each user, raising "warning" alerts at 70% spend and "critical" alerts at 90%, plus reminders when a payment is due within its configured lead time.
