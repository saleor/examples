import { Chip, Text } from "@saleor/macaw-ui/next";
import { type ReactNode } from "react";

export const ChipNeutral = ({ children }: { children: ReactNode }) => (
  <Chip size="medium" backgroundColor="surfaceNeutralHighlight">
    <Text size="small" variant="caption">
      {children}
    </Text>
  </Chip>
);
export const ChipDanger = ({ children }: { children: ReactNode }) => (
  <Chip size="medium" backgroundColor="surfaceCriticalDepressed" borderColor="neutralHighlight">
    <Text color="textCriticalDefault" size="small" variant="caption">
      {children}
    </Text>
  </Chip>
);
export const ChipSequraOrange = ({ children }: { children: ReactNode }) => (
  <Chip size="medium" __backgroundColor="rgb(255, 237, 189)">
    <Text __color="black" size="small" variant="caption">
      {children}
    </Text>
  </Chip>
);
export const ChipSuccess = ({ children }: { children: ReactNode }) => (
  <Chip size="medium" backgroundColor="decorativeSurfaceSubdued2" borderColor="neutralHighlight">
    <Text color="text2Decorative" size="small" variant="caption">
      {children}
    </Text>
  </Chip>
);
export const ChipInfo = ({ children }: { children: ReactNode }) => (
  <Chip size="medium" backgroundColor="surfaceBrandSubdued" borderColor="neutralHighlight">
    <Text color="textBrandDefault" size="small" variant="caption">
      {children}
    </Text>
  </Chip>
);
