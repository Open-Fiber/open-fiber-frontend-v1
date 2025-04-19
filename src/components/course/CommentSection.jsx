import React from "react";
import { FaHeart } from "react-icons/fa";

const CommentsSection = ({
  commentText,
  setCommentText,
  isCommentExpanded,
  handleCommentFocus,
  commentType,
  handleCommentTypeChange,
  handlePublishClick,
  filterTab,
  setFilterTab,
}) => {
  return (
    <>
      <div className="comment-input-container">
        <div className={`comment-input ${isCommentExpanded ? "expanded" : ""}`}>
          {!isCommentExpanded ? (
            <input
              type="text"
              placeholder="Escribe Tu Comentario O Pregunta"
              onClick={handleCommentFocus}
              className="comment-field"
            />
          ) : (
            <div className="expanded-comment">
              <textarea
                placeholder="Escribe Tu Comentario O Pregunta"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-textarea"
              />

              <div className="comment-divider"></div>

              <div className="comment-actions-bar">
                <div className="comment-type-options">
                  <label className="radio-container">
                    <input
                      type="radio"
                      name="commentType"
                      value="pregunta"
                      checked={commentType === "pregunta"}
                      onChange={() => handleCommentTypeChange("pregunta")}
                      id="radio-pregunta"
                    />
                    <span className="radio-label">Pregunta</span>
                  </label>
                  <label className="radio-container">
                    <input
                      type="radio"
                      name="commentType"
                      value="aporte"
                      checked={commentType === "aporte"}
                      onChange={() => handleCommentTypeChange("aporte")}
                      id="radio-aporte"
                    />
                    <span className="radio-label">Aporte</span>
                  </label>
                </div>

                <div className="comment-button-group">
                  <button
                    className="publish-button"
                    onClick={handlePublishClick}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filter-tabs">
        <div className="tabs-group">
          <button
            className={`tab ${filterTab === "todo" ? "active" : ""}`}
            onClick={() => setFilterTab("todo")}
          >
            Todo
          </button>
          <button
            className={`tab ${filterTab === "preguntas" ? "active" : ""}`}
            onClick={() => setFilterTab("preguntas")}
          >
            Preguntas
          </button>
          <button
            className={`tab ${filterTab === "aportes" ? "active" : ""}`}
            onClick={() => setFilterTab("aportes")}
          >
            Aportes
          </button>
        </div>
      </div>

      <div className="comments-list">
        {/* Comment 1 */}
        <div className="comment">
          <div className="comment-avatar"></div>
          <div className="comment-content">
            <div className="comment-actions">
              <div className="like-button">
                <FaHeart />
                <span className="like-count">10</span>
              </div>
            </div>
            <div className="comment-text">
              NSM - Están enfocadas en su segmento para el crecimiento de la
              startup. Es la métrica que mejor captura el valor clave del
              producto que se brinda a los usuarios. Son las métricas outputs,
              que reflejan el resultado de todas tus estrategias y actividades
              sin intervenir tu directamente en su aumento. Las métricas inputs
              son aquellas métricas en las que tu actividades si van a afectar
              directamente. Las métricas leads es recomendable que estén
              enfocadas en dos cosas importantes
            </div>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="comment">
          <div className="comment-avatar"></div>
          <div className="comment-content">
            <div className="comment-actions">
              <div className="like-button">
                <FaHeart />
                <span className="like-count">10</span>
              </div>
            </div>
            <div className="comment-text">
              NSM - Están enfocadas en su segmento para el crecimiento de la
              startup. Es la métrica que mejor captura el valor clave del
              producto que se brinda a los usuarios. Son las métricas outputs,
              que reflejan el resultado de todas tus estrategias y actividades
              sin intervenir tu directamente en su aumento. Las métricas inputs
              son aquellas métricas en las que tu actividades si van a afectar
              directamente. Las métricas leads es recomendable que estén
              enfocadas en dos cosas importantes
            </div>
          </div>
        </div>

        {/* Comment 3 */}
        <div className="comment">
          <div className="comment-avatar"></div>
          <div className="comment-content">
            <div className="comment-actions">
              <div className="like-button">
                <FaHeart />
                <span className="like-count">10</span>
              </div>
            </div>
            <div className="comment-text">
              NSM - Están enfocadas en su segmento para el crecimiento de la
              startup. Es la métrica que mejor captura el valor clave del
              producto que se brinda a los usuarios. Son las métricas outputs,
              que reflejan el resultado de todas tus estrategias y actividades
              sin intervenir tu directamente en su aumento. Las métricas inputs
              son aquellas métricas en las que tu actividades si van a afectar
              directamente. Las métricas leads es recomendable que estén
              enfocadas en dos cosas importantes
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
