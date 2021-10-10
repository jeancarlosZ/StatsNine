import React from 'react';

export default function Calendar() {
  return (
    <div>
      <div className="col-xxl-3 d-flex order-1 order-xxl-1 col-md-6">
        <div className="flex-fill w-100 card">
          <div className="card-header">
            <div className="card-actions float-right">
              <span className="cursor-pointer mr-1">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-darkreader-inline-stroke=""
                  style="--darkreader-inline-stroke:currentColor;">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg> */}
              </span>{' '}
              <div className="d-inline-block dropdown">
                <a aria-haspopup="true" className="" aria-expanded="false">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-darkreader-inline-stroke=""
                    style="--darkreader-inline-stroke:currentColor;">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg> */}
                </a>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="dropdown-menu dropdown-menu-right">
                  <button
                    type="button"
                    tabIndex="0"
                    role="menuitem"
                    className="dropdown-item">
                    Action
                  </button>
                  <button
                    type="button"
                    tabIndex="0"
                    role="menuitem"
                    className="dropdown-item">
                    Another Action
                  </button>
                  <button
                    type="button"
                    tabIndex="0"
                    role="menuitem"
                    className="dropdown-item">
                    Something else here
                  </button>
                </div>
              </div>
            </div>
            <h5 className="mb-0 card-title">Calendar</h5>
          </div>
          <div className="d-flex card-body">
            <div className="align-self-center w-100">
              <div className="rdt rdtStatic rdtOpen">
                <div className="rdtPicker">
                  <div className="rdtDays">
                    <table>
                      <thead>
                        <tr>
                          <th className="rdtPrev">
                            <span>‹</span>
                          </th>
                          <th className="rdtSwitch" colSpan="5" data-value="9">
                            October 2021
                          </th>
                          <th className="rdtNext">
                            <span>›</span>
                          </th>
                        </tr>
                        <tr>
                          <th className="dow">Su</th>
                          <th className="dow">Mo</th>
                          <th className="dow">Tu</th>
                          <th className="dow">We</th>
                          <th className="dow">Th</th>
                          <th className="dow">Fr</th>
                          <th className="dow">Sa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            data-value="26"
                            data-month="8"
                            data-year="2021"
                            className="rdtDay rdtOld">
                            26
                          </td>
                          <td
                            data-value="27"
                            data-month="8"
                            data-year="2021"
                            className="rdtDay rdtOld">
                            27
                          </td>
                          <td
                            data-value="28"
                            data-month="8"
                            data-year="2021"
                            className="rdtDay rdtOld">
                            28
                          </td>
                          <td
                            data-value="29"
                            data-month="8"
                            data-year="2021"
                            className="rdtDay rdtOld">
                            29
                          </td>
                          <td
                            data-value="30"
                            data-month="8"
                            data-year="2021"
                            className="rdtDay rdtOld">
                            30
                          </td>
                          <td
                            data-value="1"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            1
                          </td>
                          <td
                            data-value="2"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            2
                          </td>
                        </tr>
                        <tr>
                          <td
                            data-value="3"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            3
                          </td>
                          <td
                            data-value="4"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            4
                          </td>
                          <td
                            data-value="5"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            5
                          </td>
                          <td
                            data-value="6"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            6
                          </td>
                          <td
                            data-value="7"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            7
                          </td>
                          <td
                            data-value="8"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay rdtToday">
                            8
                          </td>
                          <td
                            data-value="9"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            9
                          </td>
                        </tr>
                        <tr>
                          <td
                            data-value="10"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            10
                          </td>
                          <td
                            data-value="11"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            11
                          </td>
                          <td
                            data-value="12"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            12
                          </td>
                          <td
                            data-value="13"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            13
                          </td>
                          <td
                            data-value="14"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            14
                          </td>
                          <td
                            data-value="15"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            15
                          </td>
                          <td
                            data-value="16"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            16
                          </td>
                        </tr>
                        <tr>
                          <td
                            data-value="17"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            17
                          </td>
                          <td
                            data-value="18"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            18
                          </td>
                          <td
                            data-value="19"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            19
                          </td>
                          <td
                            data-value="20"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            20
                          </td>
                          <td
                            data-value="21"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            21
                          </td>
                          <td
                            data-value="22"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            22
                          </td>
                          <td
                            data-value="23"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            23
                          </td>
                        </tr>
                        <tr>
                          <td
                            data-value="24"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            24
                          </td>
                          <td
                            data-value="25"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            25
                          </td>
                          <td
                            data-value="26"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            26
                          </td>
                          <td
                            data-value="27"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            27
                          </td>
                          <td
                            data-value="28"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            28
                          </td>
                          <td
                            data-value="29"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            29
                          </td>
                          <td
                            data-value="30"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            30
                          </td>
                        </tr>
                        <tr>
                          <td
                            data-value="31"
                            data-month="9"
                            data-year="2021"
                            className="rdtDay">
                            31
                          </td>
                          <td
                            data-value="1"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            1
                          </td>
                          <td
                            data-value="2"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            2
                          </td>
                          <td
                            data-value="3"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            3
                          </td>
                          <td
                            data-value="4"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            4
                          </td>
                          <td
                            data-value="5"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            5
                          </td>
                          <td
                            data-value="6"
                            data-month="10"
                            data-year="2021"
                            className="rdtDay rdtNew">
                            6
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
