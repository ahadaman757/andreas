import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "19px",
    flexBasis: "100%",
    flexShrink: 0,
    color: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<AddIcon color="white" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            How much does it costs to start using Chat Reply?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Initially, Chat Reply provides free trial to all its new users.
            After the free trial, Chat Reply provides reasonable pricing plans
            that can fit anyones budget and they can start right away!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<AddIcon color="white" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            How does Chat Reply works?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Chat Reply has a team of agents who are available 24 / 7. You only
            have to connect our plugin to your website and the agents will
            handle the rest. As soon as any of your users comes for support
            agent will reply them within 3 to 6 seconds. They'll ask for
            information and send you an email with the customer details and his
            / her query.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<AddIcon color="white" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            Which platforms are supported by Chat Reply?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Chat Reply supports all previous and latest CMS systems like
            WordPress, Shopify, etc. And support modern frameworks as well like
            ReactJS, NodeJS, Angular, etc. It doesn't matters on which platform
            your site is hosted or using which technology stack your website is
            built Chat Reply provides easy integration to almost all platforms.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
