import React from "react";
import { ChangeLogs } from "../constant/changeLogList";

export default function ChangeLogContent() {
  return (
    <article className="space-y-4">
      <h4 className="font-bold text-xl">Change Logs</h4>
      {ChangeLogs.map((log, i) => {
        return (
          <div key={"ver" + i} className="space-y-2">
            <h5 className="font-semibold text-lg">
              Version Note: {log.version}
            </h5>
            <ul className="list-disc list-inside">
              {log.list.map((change, j) => {
                return <li key={"log" + j}>{change}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </article>
  );
}
