const diet_decoder = {
    1: "paleo",
    2: "vegan",
    3: "keto",
    4: "mediterranean",
    5: "dash"
}

const cuisine_type_decoder = {
    1: "american",
    2: "south east asian",
    3: "mexican",
    4: "chinese",
    5: "mediterranean",
    6: "italian",
    7: "french",
    8: "indian",
    9: "nordic",
    10: "eastern europe",
    11: "central europe",
    12: "kosher",
    13: "british",
    14: "caribbean",
    15: "south american",
    16: "middle eastern",
    17: "asian",
    18: "japanese",
    19: "world"
}
export const decode_diet = diet => {
    return diet_decoder[diet]
}
export const decode_cuisine = cuisine => {
    return cuisine_type_decoder[cuisine]
}
