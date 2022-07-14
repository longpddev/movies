function ActionItem({
    children,
    onClick
  }) {
    return (
      <li
        onClick={onClick}
        className="px-4 py-2 color-gray-700 flex items-center text-sm border-b border-gray-300 hover:text-sky-400 cursor-pointer"
      >
        {children}
      </li>
    );
}

export default ActionItem