import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Button, Input, Select, Text } from "@saleor/macaw-ui";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface DatabaseStats {
  total: number;
  lastUpdate: string | null;
}

interface SimilarProduct {
  productId: string;
  slug: string;
  name: string;
  thumbUrl?: string;
  score: number;
}

interface SimilarProductsResponse {
  base: {
    productId: string;
    slug: string;
  } | null;
  similar: SimilarProduct[];
  error?: string;
}

interface ProductOption {
  id: string;
  name: string;
  slug: string;
}

const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description?: string;
}) => (
  <Box
    paddingY={6}
    borderWidth={1}
    borderRadius={3}
    backgroundColor="default1"
    style={{ minWidth: "240px", flex: "1" }}
  >
    <Text size={8} color="default2" marginBottom={2} display="block">
      {title}
    </Text>
    <Text size={11} marginBottom={2} display="block">
      <strong>{value}</strong>
    </Text>
    {description && (
      <Text size={6} color="default2" display="block">
        {description}
      </Text>
    )}
  </Box>
);

const SimilarProductCard = ({ product }: { product: SimilarProduct }) => {
  const { appBridge } = useAppBridge();

  const dashboardUrl = `/products/${encodeURIComponent(product.productId)}`;

  return (
    <Box padding={5} borderWidth={1} borderRadius={3} backgroundColor="default1">
      <Box display="flex" gap={5} alignItems="center">
        {product.thumbUrl && (
          <img
            src={product.thumbUrl}
            alt={product.name}
            style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "6px" }}
          />
        )}
        <Box style={{ flex: 1 }}>
          <Text
            onClick={() => appBridge?.dispatch(actions.Redirect({ to: dashboardUrl }))}
            size={8}
            marginBottom={1}
            display="block"
            color="accent1"
            textDecoration={{
              hover: "underline",
            }}
            fontWeight="medium"
            cursor="pointer"
          >
            {product.name}
          </Text>
          <Text size={6} color="default2" marginBottom={1} display="block">
            {product.slug}
          </Text>
          <Text size={6} color="info1">
            Similarity Score: {product.score.toFixed(3)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const SimilarProductsApp: NextPage = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [testResults, setTestResults] = useState<SimilarProductsResponse | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  const [seedLoading, setSeedLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductOption[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stats");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats");
      }

      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        console.warn("Failed to fetch products:", data.error);
        setProducts([]);
        return;
      }

      setProducts(data.products || []);
    } catch (err) {
      console.warn("Error fetching products:", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const testSimilarProducts = async () => {
    if (!selectedProduct.trim()) {
      setTestError("Please select a product");
      return;
    }

    try {
      setTestError(null);
      setTestResults(null);

      // Check if we need to seed first
      if (stats && stats.total === 0) {
        console.log("Database is empty, running seed script first...");
        await runSeedScript();
      }

      setTestLoading(true);

      const response = await fetch(
        `/api/similar?productId=${encodeURIComponent(selectedProduct)}&maxResults=6`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch similar products");
      }

      setTestResults(data);
    } catch (err) {
      console.error("Error testing similar products:", err);
      setTestError(err instanceof Error ? err.message : "Unknown error");
      setTestResults(null);
    } finally {
      setTestLoading(false);
    }
  };

  const runSeedScript = async () => {
    try {
      setSeedLoading(true);
      setSeedError(null);
      setSeedStatus("Starting embeddings generation...");

      const response = await fetch("/api/seed", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to run seed script");
      }

      setSeedStatus(data.message || "Seeding completed successfully!");
      // Refresh stats after seeding
      fetchStats();
    } catch (err) {
      console.error("Error running seed script:", err);
      setSeedError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSeedLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []); // Separate effect for products, run only once

  return (
    <Box padding={8} style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Box marginBottom={10}>
        <Text size={11} marginBottom={4} display="block">
          <strong>Similar Products Recommendations</strong>
        </Text>

        <Text size={7} color="default2" marginBottom={8} display="block">
          This app maintains an embeddings index of Saleor products and provides similar product
          recommendations via API.
        </Text>
      </Box>

      <Box marginBottom={10}>
        <Text size={10} marginBottom={6} display="block">
          <strong>Index Status</strong>
        </Text>

        {loading ? (
          <Box padding={4}>
            <Text>Loading stats...</Text>
          </Box>
        ) : error ? (
          <Box paddingY={4} backgroundColor="critical1" borderRadius={3}>
            <Text color="critical1">Error: {error}</Text>
          </Box>
        ) : stats ? (
          <Box display="flex" gap={4} style={{ flexWrap: "wrap" }}>
            <StatCard
              title="Total Products"
              value={stats.total}
              description="Products indexed with embeddings"
            />
            <StatCard
              title="Last Updated"
              value={stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleString() : "Never"}
              description="Most recent index update"
            />
          </Box>
        ) : null}
      </Box>

      <Box marginBottom={10}>
        <Text size={10} marginBottom={6} display="block">
          <strong>Test Similarity API</strong>
        </Text>

        {stats && stats.total === 0 && (
          <Box padding={4} backgroundColor="info1" borderRadius={3} marginBottom={4}>
            <Text size={6} display="block" marginBottom={2}>
              <strong>Setup Required:</strong>
            </Text>
            <Text size={6} display="block" marginBottom={2}>
              To use this app, you need to:
            </Text>
            <Text size={6} display="block" marginBottom={1}>
              1. Install this app in your Saleor Dashboard
            </Text>
            <Text size={6} display="block" marginBottom={1}>
              2. Ensure the app has MANAGE_PRODUCTS permissions
            </Text>
            <Text size={6} display="block">
              3. Add products to your "default-channel" in Saleor
            </Text>
          </Box>
        )}

        {seedStatus && (
          <Box padding={4} backgroundColor="info1" borderRadius={3} marginBottom={4}>
            <Text color="info1">{seedStatus}</Text>
          </Box>
        )}

        {seedError && (
          <Box padding={4} backgroundColor="critical1" borderRadius={3} marginBottom={4}>
            <Text color="critical1">Setup Error: {seedError}</Text>
          </Box>
        )}

        <Box display="flex" gap={4} alignItems="end" marginBottom={6}>
          <Box style={{ minWidth: "320px" }}>
            <Text size={6} marginBottom={2} display="block">
              Product to test
            </Text>
            {productsLoading ? (
              <Input value="Loading products..." disabled style={{ width: "100%" }} />
            ) : products.length > 0 ? (
              <Select
                value={selectedProduct}
                onChange={setSelectedProduct}
                placeholder="Select a product..."
                style={{ width: "100%" }}
                options={products.map((product) => ({
                  value: product.id,
                  label: `${product.name} (${product.slug})`,
                }))}
              />
            ) : (
              <Input value="No products available" disabled style={{ width: "100%" }} />
            )}
          </Box>
          <Button
            onClick={testSimilarProducts}
            disabled={testLoading || seedLoading || !selectedProduct || products.length === 0}
            variant="primary"
          >
            {seedLoading
              ? "Setting up embeddings..."
              : testLoading
              ? "Finding similar..."
              : "Find Similar Products"}
          </Button>
        </Box>

        {testError && (
          <Box padding={4} backgroundColor="critical1" borderRadius={3} marginBottom={4}>
            <Text color="critical1">Test Error: {testError}</Text>
          </Box>
        )}

        {testResults && (
          <Box>
            {testResults.base ? (
              <Box padding={4} backgroundColor="info1" borderRadius={3} marginBottom={6}>
                <Text>
                  Base Product: <strong>{testResults.base.productId}</strong> (
                  {testResults.base.slug})
                </Text>
              </Box>
            ) : (
              <Box padding={4} backgroundColor="critical1" borderRadius={3} marginBottom={6}>
                <Text color="critical1">Base product not found</Text>
              </Box>
            )}

            <Text size={9} marginBottom={4} display="block">
              <strong>Similar Products ({testResults.similar.length})</strong>
            </Text>

            {testResults.similar.length > 0 ? (
              <Box display="grid" gap={4}>
                {testResults.similar.map((product) => (
                  <SimilarProductCard key={product.productId} product={product} />
                ))}
              </Box>
            ) : (
              <Box padding={6} borderWidth={1} borderRadius={3} backgroundColor="default1">
                <Text color="default2">No similar products found</Text>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Box>
        <Text size={10} marginBottom={6} display="block">
          <strong>API Documentation</strong>
        </Text>
        <Box padding={6} borderWidth={1} borderRadius={3} backgroundColor="default1">
          <Text size={8} marginBottom={3} display="block">
            <strong>GET /api/similar</strong>
          </Text>
          <Text size={7} marginBottom={4} display="block">
            Get similar products for a given product ID.
          </Text>
          <Text size={6} marginBottom={2} marginLeft={2} display="block">
            <strong>Query Parameters:</strong>
          </Text>
          <Box marginBottom={4} paddingLeft={6}>
            <Text size={6} marginBottom={1} display="block">
              • <code>productId</code> (required): The product ID to find similar products for
            </Text>
            <Text size={6} display="block">
              • <code>maxResults</code> (optional): Number of similar products to return (default:
              6, max: 24)
            </Text>
          </Box>
          <Text size={6} marginBottom={2} marginLeft={2} display="block">
            <strong>Example:</strong>
          </Text>
          <Box padding={3} backgroundColor="default2" borderRadius={2} marginLeft={2}>
            <Text size={6} display="block" style={{ fontFamily: "mono" }}>
              /api/similar?productId=UHJvZHVjdDo3Mg==&maxResults=6
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SimilarProductsApp;
