const ObjectUtils = require('./ObjectUtils');

describe('ObjectUtils.changeSet', () => {
  test('verify no shallow changes', () => {

    // test cases
    const testCase = {
      objectNew: {
        age: 30,
        name: 'John',
        favoriteColor: 'blue',
      },
      objectOld: {
        age: 30,
        name: 'John',
        favoriteColor: 'blue',
      }
    };

    // results
    const result = {};

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify single shallow change', () => {

    // test cases
    const testCase = {
      objectNew: {
        age: 30,
        name: 'John',
        favoriteColor: 'blue',
      },
      objectOld: {
        age: 30,
        name: 'John',
        favoriteColor: 'green',
      }
    };

    // results
    const result = {
      favoriteColor: {
        new: 'blue',
        old: 'green'
      }
    };

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify multiple shallow changes', () => {

    // test cases
    const testCase = {
      objectNew: {
        age: 30,
        name: 'John',
        favoriteColor: 'blue',
      },
      objectOld: {
        age: 35,
        name: 'John',
        favoriteColor: 'green',
      }
    };

    // results
    const result = {
      age: {
        new: 30,
        old: 35,
      },
      favoriteColor: {
        new: 'blue',
        old: 'green'
      }
    };

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify no deep changes', () => {

    // test cases
    const testCase = {
      objectNew: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 8,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      },
      objectOld: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 8,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      }
    };

    // results
    const result = {};

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify single deep change', () => {

    // test cases
    const testCase = {
      objectNew: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 8,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      },
      objectOld: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 6,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      }
    };

    // results
    const result = {
      motorcycle: {
        engine: {
          transmission: {
            speeds: {
              new: 8,
              old: 6
            }
          }
        }
      }
    };

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify multiple deep changes', () => {

    // test cases
    const testCase = {
      objectNew: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2017,
          engine: {
            transmission: {
              speeds: 6,
              type: 'manual'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 8,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      },
      objectOld: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 6,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      }
    };

    // results
    const result = {
      car: {
        year: {
          new: 2017,
          old: 2021,
        },
        engine: {
          transmission: {
            type: {
              new: 'manual',
              old: 'automatic',
            }
          }
        }
      },
      motorcycle: {
        engine: {
          transmission: {
            speeds: {
              new: 8,
              old: 6
            }
          }
        }
      }
    };

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });

  test('verify multiple deep changes with unexpected values', () => {

    // test cases
    const testCase = {
      objectNew: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: null,
          engine: {
            transmission: {
              speeds: 6,
              type: 'manual'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 8,
              type: 'manual'
            },
            volume: false,
          }
        }
      },
      objectOld: {
        car: {
          make: 'Ford',
          model: 'F150',
          year: 2021,
          engine: {
            transmission: {
              speeds: 6,
              type: 'automatic'
            },
            volume: 5.0,
          }
        },
        motorcycle: {
          make: 'Honda',
          model: 'sfgjsfj',
          year: 2022,
          engine: {
            transmission: {
              speeds: 6,
              type: 'manual'
            },
            volume: 1.0,
          }
        }
      }
    };

    // results
    const result = {
      car: {
        year: {
          old: 2021,
        },
        engine: {
          transmission: {
            type: {
              new: 'manual',
              old: 'automatic',
            }
          }
        }
      },
      motorcycle: {
        engine: {
          transmission: {
            speeds: {
              new: 8,
              old: 6
            }
          },
          volume: {
            new: false,
            old: 1.0,
          }
        }
      }
    };

    expect(JSON.stringify(ObjectUtils.changeSet(testCase.objectNew, testCase.objectOld))).toBe(JSON.stringify(result));
  });
});
