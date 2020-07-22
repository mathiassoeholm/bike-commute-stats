/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { Helmet } from "react-helmet";
import { SummaryActivity } from "../models/strava";
import { GithubIcon } from "./github-icon";

interface IProps {
  activities: SummaryActivity[];
}

const CO2_KILOGRAMS_PER_KILOMETER = 0.21;

const SubscriptTwo = () => {
  return (
    <span
      css={css`
        display: inline-block;
        font-size: 0.6em;
        transform: translateY(0.2em);
      `}
    >
      2
    </span>
  );
};

const Home: React.FC<IProps> = ({ activities }) => {
  const commuteActivites = activities.filter((a) => a.commute);
  const totalKilometers = commuteActivites.reduce(
    (acc, activity) => acc + activity.distance / 1000,
    0
  );

  const totalCO2Kg = totalKilometers * CO2_KILOGRAMS_PER_KILOMETER;

  const DetailsParagraph = styled.p`
    font-size: 0.75rem;
    color: #333;

    a {
      color: black;
    }
  `;

  return (
    <React.Fragment>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }

          html {
            height: 100%;
          }

          body {
            height: 100%;
            margin: 0;
          }
        `}
      />
      <Helmet>
        <title>Mathias bikes to work</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div
        css={css`
          font-family: "Heebo", sans-serif;
          display: grid;
          justify-items: center;
          align-items: center;
          height: 100%;
          letter-spacing: 0.11rem;
          padding: 1rem;
        `}
      >
        <p
          css={css`
            text-align: center;
            font-size: 1.5rem;
          `}
        >
          BY BIKING TO WORK, MATHIAS HAS SAVED
          <br />
          <span
            css={css`
              display: inline-block;
              font-size: 3rem;
              font-weight: 800;
              margin: 1rem;
              text-align: center;
            `}
          >
            {Math.round(totalCO2Kg * 100) / 100} kg CO
            <SubscriptTwo />
          </span>
        </p>
        <section
          css={css`
            max-width: 500px;
            background: #f0f0f0;
            padding: 0.75rem;
          `}
        >
          <h2
            css={css`
              font-size: 1rem;
              font-weight: 400;
              text-align: center;
            `}
          >
            Details
          </h2>
          <DetailsParagraph>
            * Savings are compared to driving an average new fossil fuel car.
          </DetailsParagraph>
          <DetailsParagraph>
            * I assume that biking emits 0 kg CO
            <SubscriptTwo />, because it replaces exercise that would otherwise
            have taken place.
          </DetailsParagraph>
          <DetailsParagraph>
            * According to the The Danish Council on Climate Change
            (Klimarådet), an average new fossil fuel car emits 210 g CO
            <SubscriptTwo /> per kilometer. Source:{" "}
            <a href="https://www.klimaraadet.dk/da/system/files_force/downloads/baggrundsnotat_-_hvor_klimavenlige_er_elbiler_sammenlignet_med_benzin-_og_dieselbiler.pdf">
              “Hvor klimavenlige er elbiler sammenlignet med benzin- og
              dieselbiler?”
            </a>
          </DetailsParagraph>
        </section>
        <a href="https://github.com/mathiassoeholm/bike-commute-stats">
          <GithubIcon
            css={css`
              width: 2rem;
              opacity: 0.4;

              &:hover {
                opacity: 1;
              }
            `}
          />
        </a>
      </div>
    </React.Fragment>
  );
};

export { Home };
