import React from "react";

export default function Button({ text, style, event }) {
  return (
    <div>
      <button onClick={event} className={style}>
        {text}
      </button>
    </div>
  );
}
