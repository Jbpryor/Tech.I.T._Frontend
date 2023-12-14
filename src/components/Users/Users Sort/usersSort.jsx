function UsersSort({
  selectedSort,
  setSelectedSort,
  rotate,
  handleRotate,
  theme,
}) {

  return (
    <div
      className="users-sort-container"
      value={selectedSort}
      onChange={(event) => setSelectedSort(event.target.value)}
      style={{
        background: theme.primary_color,
        color: theme.font_color,
        borderBottom: `2px solid ${theme.border}`,
      }}
    >
      <div className="users-title">Users</div>

      <select
        className="users-sort-select"
        style={{ color: theme.font_color, background: theme.primary_color }}
      >
        <option>Name</option>
        <option>Role</option>
        <option>Email</option>
      </select>

      <i
        className={`bx bx-down-arrow users-sort-icon ${rotate ? "rotate" : ""}`}
        onClick={() => handleRotate()}
      ></i>
    </div>
  );
}

export default UsersSort;
