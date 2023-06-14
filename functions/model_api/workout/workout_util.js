const type_pref_decoder = {
  1: 'Cardio',
  2: 'Olympic Weightlifting',
  3: 'Plyometrics',
  4: 'Powerlifting',
  5: 'Strength',
  6: 'Stretching',
  7: 'Strongman'
};

const train_level_decoder = {1: 'Beginner', 2: 'Intermediate', 3: 'Expert'};

const bodypart_decoder = {
  1: 'Abdominals',
  2: 'Abductors',
  3: 'Adductors',
  4: 'Biceps',
  5: 'Calves',
  6: 'Chest',
  7: 'Forearms',
  8: 'Glutes',
  9: 'Hamstrings',
  10: 'Lats',
  11: 'Lower Back',
  12: 'Middle Back',
  13: 'Neck',
  14: 'Quadriceps',
  15: 'Shoulders',
  16: 'Traps',
  17: 'Triceps'
};

const equipment_decoder = {
  1: 'Bands',
  2: 'Barbell',
  3: 'Body Only',
  4: 'Cable',
  5: 'Dumbbell',
  6: 'E-Z Curl Bar',
  7: 'Exercise Ball',
  8: 'Foam Roll',
  9: 'Kettlebells',
  10: 'Machine',
  11: 'Medicine Ball',
  12: 'Other'
};

export const decode_type_pref = type_pref => {
  return type_pref_decoder[type_pref];
}

export const decode_train_level = train_level => {
  return train_level_decoder[train_level];
}

export const decode_bodypart = bodypart => {
  return bodypart_decoder[bodypart];
}

export const decode_equipment = equipment => {
  return equipment_decoder[equipment];
}
