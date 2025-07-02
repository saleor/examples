import { Box, Text } from "@saleor/macaw-ui/next";
import { type ReactNode, isValidElement } from "react";
import { appLayoutBoxRecipe, appLayoutTextRecipe } from "./appLayout.css";

export const AppLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap={9}
      marginX="auto"
      __maxWidth={1156}
      paddingTop={10}
      __paddingBottom="20rem"
    >
      <Box display="flex" flexDirection="column" rowGap={2}>
        <Text as="h1" variant="hero" size="medium">
          {title}
        </Text>
        {isValidElement(description) ? (
          description
        ) : (
          <Text as="p" variant="body" size="medium">
            {description}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};

export const AppLayoutRow = ({
  title,
  description,
  children,
  disabled = false,
  error = false,
}: {
  title: string;
  description?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  children: ReactNode;
}) => {
  return (
    <Box display="grid" className={appLayoutBoxRecipe({ error, disabled })}>
      <Box display="flex" flexDirection="column" rowGap={10}>
        <Text
          as="h2"
          className={appLayoutTextRecipe({ error, disabled })}
          size="large"
          variant="heading"
        >
          {title}
        </Text>
        {isValidElement(description) ? (
          <Box display="flex" flexDirection="column" rowGap={2}>
            {description}
          </Box>
        ) : (
          <Text
            as="p"
            className={appLayoutTextRecipe({ error, disabled })}
            variant="body"
            size="medium"
          >
            {description}
          </Text>
        )}
      </Box>
      <Box display="flex" flexDirection="column" rowGap={10}>
        {children}
      </Box>
    </Box>
  );
};
