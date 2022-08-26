const ObjectUtils = require('../src/ObjectUtils.js');

describe('changeSet(objectNew = {}, objectOld = {})', () => {

  // test 1
  test('test #1 - shallow change-set no changes', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        favoriteColor: 'green',
        name: 'George',
      },
      objectOldState: {
        favoriteColor: 'green',
        name: 'George',
      },
      expectedResult: {},
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 2
  test('test #2 - shallow change-set single change', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        favoriteColor: 'blue',
        name: 'George',
      },
      objectOldState: {
        favoriteColor: 'green',
        name: 'George',
      },
      expectedResult: {
        favoriteColor: {
          new: 'blue',
          old: 'green',
        },
      },
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 3
  test('test #3 - shallow change-set mulitple changes', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        favoriteColor: 'blue',
        name: 'John',
      },
      objectOldState: {
        favoriteColor: 'green',
        name: 'George',
      },
      expectedResult: {
        favoriteColor: {
          new: 'blue',
          old: 'green',
        },
        name: {
          new: 'John',
          old: 'George',
        }
      },
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 4
  test('test #4 - deep change-set no changes', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'automatic'
            }
          },
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-1',
        },
        motorcycle: {
          color: 'black',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 6,
              type: 'manual'
            }
          },
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
        },
      },
      objectOldState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'automatic'
            }
          },
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-1',
        },
        motorcycle: {
          color: 'black',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 6,
              type: 'manual'
            }
          },
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
        },
      },
      expectedResult: {},
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 5
  test('test #5 - deep change-set single change', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'manual'
            }
          },
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-1',
        },
        motorcycle: {
          color: 'black',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 6,
              type: 'manual'
            }
          },
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
        },
      },
      objectOldState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'automatic'
            }
          },
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-1',
        },
        motorcycle: {
          color: 'black',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 6,
              type: 'manual'
            }
          },
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
        },
      },
      expectedResult: {
        car: {
          engine: {
            transmission: {
              type: {
                new: 'manual',
                old: 'automatic',
              }
            }
          }
        }
      },
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 6
  test('test #6 - deep change-set multiple changes', async () => {
    expect.assertions(1);

    const testCase = {
      objectNewState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'manual'
            }
          },
          licensePlate: undefined,
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-2',
          owner: 'George',
        },
        motorcycle: {
          color: 'blue',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 5,
              type: 'manual'
            }
          },
          licensePlate: undefined,
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
          owner: null,
        },
      },
      objectOldState: {
        car: {
          color: 'red',
          engine: {
            cylinders: 6,
            transmission: {
              gearSpeeds: 8,
              type: 'automatic'
            }
          },
          licensePlate: undefined,
          manufacturer: 'CarMaker',
          model: 'GenericCarModel-1',
          owner: false,
        },
        motorcycle: {
          color: 'black',
          engine: {
            cylinders: 4,
            transmission: {
              gearSpeeds: 6,
              type: 'manual'
            }
          },
          licensePlate: undefined,
          manufacturer: 'MotorcycleMaker',
          model: 'GenericMotorcycleModel-1',
          owner: null,
        },
      },
      expectedResult: {
        car: {
          engine: {
            transmission: {
              type: {
                new: 'manual',
                old: 'automatic',
              }
            }
          },
          model: {
            new: 'GenericCarModel-2',
            old: 'GenericCarModel-1',
          },
          owner: {
            new: 'George',
            old: false,
          }
        },
        motorcycle: {
          color: {
            new: 'blue',
            old: 'black',
          },
          engine: {
            transmission: {
              gearSpeeds: {
                new: 5,
                old: 6,
              },
            }
          },
        },
      },
    };

    expect(await ObjectUtils.changeSet(testCase.objectNewState, testCase.objectOldState)).toEqual(
      testCase.expectedResult,
    );
  });
});