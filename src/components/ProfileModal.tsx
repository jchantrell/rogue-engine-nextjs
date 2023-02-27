import { constants } from "../constants";

export const ProfileModal = () => {
  return (
    <>
      <input
        type="checkbox"
        id={constants.menus.profileSettings.label}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {constants.menus.profileSettings.value}
          </h3>
          <p className="py-4">Info here...</p>
          <div className="modal-action">
            <label
              htmlFor={constants.menus.profileSettings.label}
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
