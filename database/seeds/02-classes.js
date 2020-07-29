
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {
          name: "Yoga",
          type: "stretching",
          startTime: "2:00pm",
          duration: "1 hour",
          intensity: 2,
          location: "park",
          numberOfRegisteredAttendees: 7,
          maxClassSize: 12
      },
      {
          name: "Pilates",
          type: "cardio",
          startTime: "1:00pm",
          duration: "1 hour",
          intensity: 3,
          location: "mall",
          numberOfRegisteredAttendees: 11,
          maxClassSize: 20
      },
      ]);
    });
};
