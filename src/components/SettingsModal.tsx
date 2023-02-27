import { constants } from "../constants";

export const SettingsModal = () => {
  return (
    <>
      <input
        type="checkbox"
        id={constants.menus.websiteSettings.label}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {constants.menus.websiteSettings.value}
          </h3>
          <p className="py-4">Info here...</p>
          <div className="modal-action">
            <label
              htmlFor={constants.menus.websiteSettings.label}
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
