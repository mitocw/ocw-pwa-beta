import React, { useState, useCallback } from 'react';
import { Button } from '@rmwc/button';
import { Elevation } from '@rmwc/elevation';
import { MdFavorite } from 'react-icons/md';
import './ocw-support-section.scss';

const OcwSupportSection = (() => {
  const [showSupport, setShowSupport] = useState(true);
  const navigateToMoreInfo = useCallback(
    () => {
      window.location.href = 'https://ocw.mit.edu/support';
    },
  );
  const dismiss = useCallback(
    () => {
      setShowSupport(false);
    },
  );
  const navigateToSupport = useCallback(
    () => {
      window.location.href = 'https://ocw.mit.edu/support';
    },
  );

  return showSupport
    ? (
      <Elevation className="support-section-container" z="15">
        <h3>
          <span className="support-section-icon">
            <MdFavorite />
          </span>
          Support OpenCourseWare
        </h3>
        <p>
          Donations from user like you support our efforts to provide
          free materials to any learner in the world
        </p>
        <div className="support-section-footer">
          <div className="support-section-footer-left-items">
            <Button
              className="support-section-button"
              onClick={navigateToMoreInfo}
            >
              More info
            </Button>
          </div>
          <div className="support-section-footer-right-items">
            <Button
              className="support-section-button"
              onClick={dismiss}
            >
              Dismiss
            </Button>
            <Button
              className="support-section-button"
              onClick={navigateToSupport}
            >
              Support
            </Button>
          </div>
        </div>
      </Elevation>
    )
    : null;
});

export default OcwSupportSection;
