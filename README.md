Please find the original ChatbotUI repository here: https://github.com/mckaywrigley/chatbot-ui

# Journal UI

The open-source AI Journal app for everyone.

## Updating

In your terminal at the root of your local Chatbot UI repository, run:

```bash
npm run update
```

## Local Quickstart

Follow these steps to get your own Chatbot UI instance running locally.


### 1. Clone the repo

```bash
git clone https://github.com/bpalagi/journal-ui.git
```

### 2. Install dependencies

Open a terminal in the root directory of your local Journal UI repository and run:

```bash
npm install
```

### 3. Install Supabase & run locally


#### 1. Install Docker

#### 2. Install Supabase CLI

#### 3. Start Supabase

In your terminal at the root of your local Journal UI repository, run:

```bash
npx supabase start
```

### 4. Fill in secrets

#### 1. Environment variables

In your terminal at the root of your local Journal UI repository, run:

```bash
cp .env.local.example .env.local
```

Get the required values by running:

```bash
npx supabase status
```

Note: Use `API URL` from `supabase status` for `NEXT_PUBLIC_SUPABASE_URL`

Now go to your `.env.local` file and fill in the values.

If the environment variable is set, it will disable the input in the user settings.

#### 2. SQL setup

In the 1st migration file `supabase/migrations/20240108234540_setup.sql` you will need to replace 2 values with the values you got above:

- `project_url` (line 53): `http://supabase_kong_chatbotui:8000` (default) can remain unchanged if you don't change your `project_id` in the `config.toml` file
- `service_role_key` (line 54): You got this value from running `supabase status`

This prevents issues with storage files not being deleted properly.

### 5. Install Ollama (optional for local models)

Example:
```bash
ollama run orca-mini
```

### 6. Run app locally

In your terminal at the root of your local Journal UI repository, run:

```bash
npm run chat
```

Your local instance of ChJournalatbot UI should now be running at [http://localhost:3000](http://localhost:3000).

You can view your backend GUI at [http://localhost:54323/project/default/editor](http://localhost:54323/project/default/editor).


## Hosted Quickstart

Follow these steps to get your own Chatbot UI instance running in the cloud.

Video tutorial coming soon.

### 1. Follow local quickstart

Repeat steps 1-4 in "Local Quickstart" above.

You will want separate repositories for your local and hosted instances.

Create a new repository for your hosted instance of Chatbot UI on GitHub and push your code to it.

### 2. Set up backend with Supabase

#### 1. Create a new project

Go to [Supabase](https://supabase.com/) and create a new project.

#### 2. Get project values

Once you are in the project dashboard, click on the "Project Settings" icon tab on the far bottom left.

Here you will get the values for the following environment variables:

- `Project Ref`: Found in "General settings" as "Reference ID"

- `Project ID`: Found in the URL of your project dashboard (Ex: https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>/settings/general)

While still in "Settings" click on the "API" text tab on the left.

Here you will get the values for the following environment variables:

- `Project URL`: Found in "API Settings" as "Project URL"

- `Anon key`: Found in "Project API keys" as "anon public"

- `Service role key`: Found in "Project API keys" as "service_role" (Reminder: Treat this like a password!)

#### 3. Configure auth

Next, click on the "Authentication" icon tab on the far left.

In the text tabs, click on "Providers" and make sure "Email" is enabled.

We recommend turning off "Confirm email" for your own personal instance.

#### 4. Connect to hosted db

Open up your repository for your hosted instance of Chatbot UI.

In the 1st migration file `supabase/migrations/20240108234540_setup.sql` you will need to replace 2 values with the values you got above:

- `project_url` (line 53): Use the `Project URL` value from above
- `service_role_key` (line 54): Use the `Service role key` value from above

Now, open a terminal in the root directory of your local Chatbot UI repository. We will execute a few commands here.

Login to Supabase by running:

```bash
supabase login
```

Next, link your project by running the following command with the "Project Ref" and "Project ID" you got above:

```bash
supabase link --project-ref <project-id>
```

Your project should now be linked.

Finally, push your database to Supabase by running:

```bash
supabase db push
```

Your hosted database should now be set up!

### 3. Set up frontend with Vercel

Go to [Vercel](https://vercel.com/) and create a new project.

In the setup page, import your GitHub repository for your hosted instance of Chatbot UI.

In environment variables, add the following from the values you got above:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_OLLAMA_URL` (only needed when using local Ollama models; default: `http://localhost:11434`)

You can also add API keys as environment variables.

- `OPENAI_API_KEY`
- `AZURE_OPENAI_API_KEY`
- `NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT`
- `NEXT_PUBLIC_AZURE_GPT_45_VISION_ID`

For the full list of environment variables, refer to the '.env.local.example' file. If the environment variables are set for API keys, it will disable the input in the user settings.

Click "Deploy" and wait for your frontend to deploy.

Once deployed, you should be able to use your hosted instance of Chatbot UI via the URL Vercel gives you.
