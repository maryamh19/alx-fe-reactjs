function UserProfile() {
  return (
    /* Container: 
       - p-4 on small screens, p-8 on md+ screens
       - max-w-xs on small screens, max-w-sm on md+ screens
       - hover:shadow-xl adds an extra touch of depth on hover
    */
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      
      {/* Image: 
          - w-24 h-24 on small screens
          - w-36 h-36 on md+ screens
      */}
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-24 md:w-36 md:h-36 mx-auto" 
      />
      
      {/* Heading: 
          - text-lg on small screens
          - text-xl on md+ screens
      */}
      <h1 className="text-lg md:text-xl text-blue-800 my-4">
        John Doe
      </h1>
      
      {/* Paragraph: 
          - text-sm on small screens
          - text-base on md+ screens
      */}
      <p className="text-gray-600 text-sm md:text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
      
    </div>
  );
}

export default UserProfile;