import { CSSProperties } from "react";
import Juxtapose from "@components/Juxtapose/Juxtapose";
import { Label } from "@samvera/clover-iiif/primitives";
import { styled } from "@src/styles/stitches";

const MDXBeforeAfter = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  height = "600px",
  initialPosition = 50,
  label,
  region = "full",
  size = "1200,",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: CSSProperties["height"];
  initialPosition?: number;
  label?: string;
  region?: string;
  size?: string;
}) => {
  return (
    <StyledMDXBeforeAfterFigure>
      <StyledMDXBeforeAfter css={{ height }}>
        <Juxtapose
          beforeResource={beforeSrc}
          afterResource={afterSrc}
          beforeAlt={beforeAlt}
          afterAlt={afterAlt}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
          region={region}
          size={size}
          initialPosition={initialPosition}
        />
      </StyledMDXBeforeAfter>
      {label && (
        <figcaption>
          <Label label={label} />
        </figcaption>
      )}
    </StyledMDXBeforeAfterFigure>
  );
};

const StyledMDXBeforeAfter = styled("div", {
  backgroundColor: "var(--gray-3)",
  borderRadius: "3px",
});

const StyledMDXBeforeAfterFigure = styled("figure", {
  padding: "0",
  margin: "0",

  "& figcaption": {
    padding: "$gr3 0",
    fontSize: "$gr3",
    fontWeight: "500",
  },
});

export default MDXBeforeAfter;