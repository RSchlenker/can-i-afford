module.exports = {
  getToolsResponse: function getToolsResponse(tools) {
    const formattedTools = []
    for (const tool of tools) {
      formattedTools.push({
        function: {
          arguments: JSON.stringify(tool.arguments),
          name: tool.type,
        },
        id: 'call_HRCL3G4F4blphAD1lUL6Z5vU',
        type: 'function',
      })
    }
    return {
      choices: [
        {
          content_filter_results: {},
          finish_reason: 'tool_calls',
          index: 0,
          message: {
            content: null,
            role: 'assistant',
            tool_calls: formattedTools,
          },
        },
      ],
      created: 1719903501,
      id: 'chatcmpl-9gRkz5AQWyqSvMQYKRlv7GJ7uulc5',
      model: 'gpt-4',
      object: 'chat.completion',
    }
  },
}
