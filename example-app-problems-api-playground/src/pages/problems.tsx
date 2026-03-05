import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Button, Input, Text } from "@saleor/macaw-ui";
import { NextPage } from "next";
import { FormEvent, useState } from "react";

async function callProblemsProxy(
  token: string,
  saleorApiUrl: string,
  operationName: string,
  variables: Record<string, unknown>
) {
  const response = await fetch("/api/problems-proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization-bearer": token,
      "saleor-api-url": saleorApiUrl,
    },
    body: JSON.stringify({ operationName, variables }),
  });

  return response.json();
}

const ProblemsPlayground: NextPage = () => {
  const { appBridgeState } = useAppBridge();

  const [createKey, setCreateKey] = useState("");
  const [createMessage, setCreateMessage] = useState("");
  const [aggregationPeriod, setAggregationPeriod] = useState("");
  const [criticalThreshold, setCriticalThreshold] = useState("");
  const [createResult, setCreateResult] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const [dismissKeys, setDismissKeys] = useState("");
  const [dismissIds, setDismissIds] = useState("");
  const [dismissResult, setDismissResult] = useState<string | null>(null);
  const [dismissError, setDismissError] = useState<string | null>(null);
  const [dismissLoading, setDismissLoading] = useState(false);

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCreateResult(null);
    setCreateError(null);
    setCreateLoading(true);

    const token = appBridgeState?.token;
    const saleorApiUrl = appBridgeState?.saleorApiUrl;

    if (!token || !saleorApiUrl) {
      setCreateError("App is not connected to Saleor Dashboard.");
      setCreateLoading(false);
      return;
    }

    const input: Record<string, unknown> = {
      key: createKey,
      message: createMessage,
    };

    if (aggregationPeriod !== "") {
      input.aggregationPeriod = parseInt(aggregationPeriod, 10);
    }
    if (criticalThreshold !== "") {
      input.criticalThreshold = parseInt(criticalThreshold, 10);
    }

    try {
      const result = await callProblemsProxy(token, saleorApiUrl, "AppProblemCreate", {
        input,
      });

      const data = result?.data?.appProblemCreate;
      if (data?.errors?.length > 0) {
        setCreateError(
          data.errors
            .map((e: { field: string | null; message: string }) =>
              e.field ? `${e.field}: ${e.message}` : e.message
            )
            .join(", ")
        );
      } else if (data?.appProblem?.id) {
        setCreateResult(`Problem created with ID: ${data.appProblem.id}`);
      } else {
        setCreateError("Unexpected response from the API.");
      }
    } catch (err) {
      setCreateError(String(err));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDismissSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDismissResult(null);
    setDismissError(null);
    setDismissLoading(true);

    const token = appBridgeState?.token;
    const saleorApiUrl = appBridgeState?.saleorApiUrl;

    if (!token || !saleorApiUrl) {
      setDismissError("App is not connected to Saleor Dashboard.");
      setDismissLoading(false);
      return;
    }

    const byApp: Record<string, string[]> = {};

    if (dismissKeys.trim()) {
      byApp.keys = dismissKeys.split(",").map((k) => k.trim());
    }
    if (dismissIds.trim()) {
      byApp.ids = dismissIds.split(",").map((id) => id.trim());
    }

    try {
      const result = await callProblemsProxy(token, saleorApiUrl, "AppProblemDismiss", {
        input: { byApp },
      });

      const data = result?.data?.appProblemDismiss;
      if (data?.errors?.length > 0) {
        setDismissError(
          data.errors
            .map((e: { field: string | null; message: string }) =>
              e.field ? `${e.field}: ${e.message}` : e.message
            )
            .join(", ")
        );
      } else {
        setDismissResult("Problems dismissed successfully.");
      }
    } catch (err) {
      setDismissError(String(err));
    } finally {
      setDismissLoading(false);
    }
  };

  return (
    <Box padding={8} display="flex" flexDirection="column" gap={8} __maxWidth="640px">
      <Text as="h1" size={11}>
        Problems API Playground
      </Text>

      {/* Report Problem Form */}
      <Box as="form" onSubmit={handleCreateSubmit} display="flex" flexDirection="column" gap={4}>
        <Text as="h2" size={8}>
          Report a Problem
        </Text>

        <Input
          label="Key"
          required
          value={createKey}
          onChange={(e) => setCreateKey(e.target.value)}
          helperText="Category identifier (3-128 characters)"
        />
        <Input
          label="Message"
          required
          value={createMessage}
          onChange={(e) => setCreateMessage(e.target.value)}
          helperText="Human-readable description (min 3 characters)"
        />
        <Input
          label="Aggregation Period (minutes)"
          type="number"
          value={aggregationPeriod}
          onChange={(e) => setAggregationPeriod(e.target.value)}
          helperText="Time window for merging duplicates. Default 60, 0 to disable."
        />
        <Input
          label="Critical Threshold"
          type="number"
          value={criticalThreshold}
          onChange={(e) => setCriticalThreshold(e.target.value)}
          helperText="Marks critical once count reaches this value."
        />

        <Button type="submit" disabled={createLoading}>
          {createLoading ? "Reporting..." : "Report Problem"}
        </Button>

        {createResult && (
          <Box backgroundColor="success1" padding={4} borderRadius={4}>
            <Text color="success1">{createResult}</Text>
          </Box>
        )}
        {createError && (
          <Box backgroundColor="critical1" padding={4} borderRadius={4}>
            <Text color="critical1">{createError}</Text>
          </Box>
        )}
      </Box>

      {/* Dismiss Problem Form */}
      <Box as="form" onSubmit={handleDismissSubmit} display="flex" flexDirection="column" gap={4}>
        <Text as="h2" size={8}>
          Dismiss Problems
        </Text>
        <Text as="p" color="default2">
          Dismiss problems by the app. Provide keys or IDs (comma-separated).
        </Text>

        <Input
          label="Keys (comma-separated)"
          value={dismissKeys}
          onChange={(e) => setDismissKeys(e.target.value)}
          helperText="e.g. payment-gateway-health, warehouse-api-health"
        />
        <Input
          label="IDs (comma-separated)"
          value={dismissIds}
          onChange={(e) => setDismissIds(e.target.value)}
          helperText="e.g. QXBwUHJvYmxlbTox, QXBwUHJvYmxlbToy"
        />

        <Button type="submit" variant="secondary" disabled={dismissLoading}>
          {dismissLoading ? "Dismissing..." : "Dismiss Problems"}
        </Button>

        {dismissResult && (
          <Box backgroundColor="success1" padding={4} borderRadius={4}>
            <Text color="success1">{dismissResult}</Text>
          </Box>
        )}
        {dismissError && (
          <Box backgroundColor="critical1" padding={4} borderRadius={4}>
            <Text color="critical1">{dismissError}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProblemsPlayground;
