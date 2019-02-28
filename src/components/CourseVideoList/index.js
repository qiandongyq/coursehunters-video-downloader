import React from "react";
import "react-sweet-progress/lib/style.css";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import _ from "lodash";

import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import "video-react/dist/video-react.css";
import { Checkbox } from "../../UI";

import * as S from "./styles.js";

const Row = React.memo(props => {
  const {
    isStart,
    changeSelectedLessons,
    openIndex,
    setOpenIndex,
    lesson,
    index
  } = props;
  return (
    <div key={lesson.name}>
      <S.Video isFinished={lesson.isFinished}>
        <Checkbox
          disabled={isStart}
          checked={lesson.checked}
          onChange={() => changeSelectedLessons(lesson.name)}
        />
        <div>
          <S.Preview width="80" height="auto">
            <source src={lesson.url} type="video/mp4" />
          </S.Preview>
        </div>
        <div>
          <S.Name>{lesson.name}</S.Name>
          <S.Size>
            {`${lesson.status.transferred} of ${lesson.status.total}`}
            <S.Speed>{`${lesson.status.speed} kB / s`}</S.Speed>
          </S.Size>

          <S.StyledProgress
            percent={lesson.isFinished ? 100 : `${lesson.status.percentage}`}
            status={lesson.progress}
          />
        </div>
        <div>
          <S.PlayIcon
            onClick={() => setOpenIndex(openIndex === index ? false : index)}
          >
            <i className="fas fa-video" />
          </S.PlayIcon>
        </div>
        <S.RemainingTimer>
          {lesson.status.remaining === 0 ? (
            ""
          ) : (
            <div>
              {lesson.isFinished ? (
                "Finished"
              ) : (
                <>
                  {lesson.status.remaining}
                  <S.remainingText>remaining</S.remainingText>
                </>
              )}
            </div>
          )}
        </S.RemainingTimer>
      </S.Video>
      <S.PosedWatch pose={openIndex === index ? "open" : "closed"}>
        {openIndex === index && (
          <Player playsInline src={lesson.url}>
            <BigPlayButton position="center" />
            <LoadingSpinner />
          </Player>
        )}
      </S.PosedWatch>
    </div>
  );
});

const CourseVideoList = React.memo(props => {
  const { selectedLessons, changeSelectedLessons, isStart } = props;
  const [openIndex, setOpenIndex] = React.useState();

  return (
    <S.Container>
      <ScrollBar>
        <div>
          {_.map(selectedLessons, (lesson, index) => {
            return (
              <Row
                lesson={lesson}
                index={index}
                changeSelectedLessons={changeSelectedLessons}
                isStart={isStart}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            );
          })}
        </div>
      </ScrollBar>
    </S.Container>
  );
});

export default CourseVideoList;
