exports.up = function (knex) {
  return knex("series").insert([
    { series_name: "1º Série", series_number: 1 },
    { series_name: "2º Série", series_number: 2 },
    { series_name: "3º Série", series_number: 3 },
    { series_name: "4º Série", series_number: 4 },
    { series_name: "5º Série", series_number: 5 },
    { series_name: "6º Série", series_number: 6 },
    { series_name: "7º Série", series_number: 7 },
    { series_name: "8º Série", series_number: 8 },
    { series_name: "1º Ano", series_number: 11 },
    { series_name: "2º Ano", series_number: 12 },
    { series_name: "3º Ano", series_number: 13 },
  ]);
};

exports.down = function (knex) {};
