const { getToolsResponse } = require('../util')

const sampleResponse = {
  id: 'get-tool-calls',
  url: '/gpt-4o/deployments/gpt-4o/chat/completions',
  method: 'POST',
  variants: [
    {
      id: 'mixed',
      type: 'json',
      options: {
        status: 200,
        body: getToolsResponse([
          {
            arguments: {
              name: 'mein mock einkommen',
              startYear: 2040,
              endYear: 2050,
              amount: 4000,
            },
            type: 'income',
          },
          {
            arguments: {
              name: 'mein mock auskommen',
              startYear: 2030,
              endYear: 2040,
              amount: 3000,
            },
            type: 'monthlyOutcome',
          },
          {
            arguments: {
              name: 'mein mock einkommen',
              startYear: 2033,
              endYear: 2037,
              factor: 0.5,
            },
            type: 'reduceTo',
          },
          {
            arguments: {
              name: 'mein mock jahresverbrauch',
              startYear: 2033,
              endYear: 2065,
              amount: 2000,
            },
            type: 'yearlyOutcome',
          },
          {
            arguments: {
              name: 'mein mock jahreseinkommen',
              year: 2045,
              amount: 200000,
            },
            type: 'oneTimeEvent',
          },
          {
            arguments: {
              amount: 10000,
            },
            type: 'changeStartVolume',
          },
        ]),
      },
    },
    {
      id: 'changeStartVolume',
      type: 'json',
      options: {
        status: 200,
        body: getToolsResponse([
          {
            arguments: {
              amount: 10000,
            },
            type: 'changeStartVolume',
          },
        ]),
      },
    },
    {
      id: 'addFactors',
      type: 'json',
      options: {
        status: 200,
        body: getToolsResponse([
          {
            arguments: {
              name: 'mein mock einkommen',
              startYear: 2040,
              endYear: 2050,
              amount: 4000,
            },
            type: 'income',
          },
          {
            arguments: {
              name: 'mein mock auskommen',
              startYear: 2030,
              endYear: 2040,
              amount: 3000,
            },
            type: 'monthlyOutcome',
          },
          {
            arguments: {
              name: 'mein mock einkommen',
              startYear: 2033,
              endYear: 2037,
              factor: 0.5,
            },
            type: 'reduceTo',
          },
          {
            arguments: {
              name: 'mein mock jahresverbrauch',
              startYear: 2033,
              endYear: 2065,
              amount: 2000,
            },
            type: 'yearlyOutcome',
          },
          {
            arguments: {
              name: 'mein mock jahreseinkommen',
              year: 2045,
              amount: 200000,
            },
            type: 'oneTimeEvent',
          },
        ]),
      },
    },
  ],
}

module.exports = [sampleResponse]
