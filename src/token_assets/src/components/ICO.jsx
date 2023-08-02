import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function ICO(props) {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Grab Now");

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Initial Coin Offering
      </h2>
      <label>Get your free SD tokens here! Claim 5000 SD tokens to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default ICO;
