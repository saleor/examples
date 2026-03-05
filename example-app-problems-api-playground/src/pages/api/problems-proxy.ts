import { createProtectedHandler } from "@saleor/app-sdk/handlers/next";
import { apl } from "@/saleor-app";

const APP_PROBLEM_CREATE_MUTATION = `
  mutation AppProblemCreate($input: AppProblemCreateInput!) {
    appProblemCreate(input: $input) {
      appProblem {
        id
        message
        key
        count
        isCritical
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const APP_PROBLEM_DISMISS_MUTATION = `
  mutation AppProblemDismiss($input: AppProblemDismissInput!) {
    appProblemDismiss(input: $input) {
      errors {
        field
        message
        code
      }
    }
  }
`;

const MUTATIONS: Record<string, string> = {
  AppProblemCreate: APP_PROBLEM_CREATE_MUTATION,
  AppProblemDismiss: APP_PROBLEM_DISMISS_MUTATION,
};

const handler = createProtectedHandler(
  async (req, res, { authData }) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { operationName, variables } = req.body as {
      operationName: string;
      variables: Record<string, unknown>;
    };

    const query = MUTATIONS[operationName];
    if (!query) {
      return res.status(400).json({ error: `Unknown operation: ${operationName}` });
    }

    const response = await fetch(authData.saleorApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  },
  apl,
  []
);

export default handler;
