import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../ui/FlexBetween";
import WidgetWrapper from "../../ui/WidgetWrapper";
import advert from "../../../public/assets/DB.avif";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={advert}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Deutsche Bahn</Typography>
        <Typography color={medium}>bahn.de</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Mit dem Super Sparpreis ab 17,90 Euro klimafreundlich durch Deutschland
        reisen..
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
