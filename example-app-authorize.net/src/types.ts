export type JSONValue = string | number | boolean | JSONObject | JSONArray | null;

export type JSONObject = {
  readonly [x in string]: JSONValue;
};

type JSONArray = readonly JSONValue[];
