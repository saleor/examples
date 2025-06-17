import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { NextPage } from "next";
import { useFetchAllCheckoutsQuery } from "../../generated/graphql";

const AbandonedCheckoutsPage: NextPage = () => {
  const [{ data, error }] = useFetchAllCheckoutsQuery();

  if (!data?.checkouts) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Abandoned Checkouts</h1>

      <main>
        {data?.checkouts.edges.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="checkouts table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Checkout Id</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.checkouts.edges.map((row, i) => (
                  <TableRow key={row.node.id}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{row.node.id}</TableCell>
                    <TableCell>{row.node.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No data to display...</div>
        )}
      </main>
    </div>
  );
};

export default AbandonedCheckoutsPage;
