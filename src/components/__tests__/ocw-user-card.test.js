import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import OcwUserCard, { COURSEWARE_QUERY } from '../ocw-user-card';

const props = {
  id: '1204324',
};

const MOCKS = [
  {
    request: {
      query: COURSEWARE_QUERY,
      variables: {
        coursewareUid: '1204324',
      },
    },
    result: {
      data: {
        allCoursewares: [
          {
            id: 1,
            title: 'test-title',
            courseLevel: 'test-level',
            trackingTitle: 'test-tracking-title',
            imageSrc: 'test-image-src',
            description: 'test-description',
            departmentNumber: 'test-department-number',
            masterCourseNumber: 'test-master-course-number',
          },
        ],
      },
    },
  },
];

// TODO: move this in its dedicated file when we have more tests.
// Used to circumvent the following:
// Warning: An update to OcwUserCard inside a test was not wrapped in act(...).
// When testing, code that causes React state updates should be wrapped into act(...):
// https://reactjs.org/docs/test-utils.html#act
// https://github.com/facebook/react/issues/14769
// https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing
// https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
const wait = async (ms = 0) => {
  await act(() => (
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  ));
};
// END TODO

afterEach(cleanup);

describe('OCW User Card', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={MOCKS}>
        <OcwUserCard {...props} />
      </MockedProvider>,
    );

    await wait();

    const div = getByText('test-level Level');
    expect(div.tagName).toBe('DIV');
  });
});
