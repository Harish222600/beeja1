import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCourses, approveCourse, deleteCourse } from "../../../services/operations/adminAPI";
import { FaCheck, FaTrash, FaEye } from "react-icons/fa";

const CourseManagement = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch courses from backend API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const courses = await getAllCourses(token);
      setCourses(courses);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApproveCourse = async (courseId) => {
    try {
      await approveCourse(courseId, token);
      fetchCourses(); // Refresh course list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId, token);
        fetchCourses(); // Refresh course list
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleViewCourse = (courseId) => {
    // Implement course preview/details view
    console.log("View course:", courseId);
  };

  // Calculate statistics
  const totalCourses = courses.length;
  const pendingCourses = courses.filter(course => !course.status || course.status === 'Draft').length;
  const activeCourses = courses.filter(course => course.status === 'Published').length;

  return (
    <div className="text-richblack-5">
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-6">Course Management</h4>
        
        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-richblack-700 p-4 rounded-lg">
            <h5 className="text-sm text-richblack-50">Total Courses</h5>
            <p className="text-2xl font-bold text-yellow-50">{totalCourses}</p>
          </div>
          <div className="bg-richblack-700 p-4 rounded-lg">
            <h5 className="text-sm text-richblack-50">Pending Approval</h5>
            <p className="text-2xl font-bold text-yellow-50">{pendingCourses}</p>
          </div>
          <div className="bg-richblack-700 p-4 rounded-lg">
            <h5 className="text-sm text-richblack-50">Active Courses</h5>
            <p className="text-2xl font-bold text-yellow-50">{activeCourses}</p>
          </div>
        </div>
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-richblack-700">
                <th className="p-4 border border-richblack-600">Title</th>
                <th className="p-4 border border-richblack-600">Instructor</th>
                <th className="p-4 border border-richblack-600">Category</th>
                <th className="p-4 border border-richblack-600">Price</th>
                <th className="p-4 border border-richblack-600">Status</th>
                <th className="p-4 border border-richblack-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center">No courses found.</td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id} className="border-b border-richblack-600">
                    <td className="p-4">{course.courseName}</td>
                    <td className="p-4">
                      {course.instructor?.firstName} {course.instructor?.lastName}
                    </td>
                    <td className="p-4">{course.category?.name || 'N/A'}</td>
                    <td className="p-4">₹{course.price}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded ${
                        course.status === 'Published'
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {course.status || 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-3">
                        {(!course.status || course.status === 'Draft') && (
                          <button
                            onClick={() => handleApproveCourse(course._id)}
                            className="text-green-500 hover:text-green-600"
                            title="Approve Course"
                          >
                            <FaCheck size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleViewCourse(course._id)}
                          className="text-yellow-50 hover:text-yellow-100"
                          title="View Course"
                        >
                          <FaEye size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="text-red-500 hover:text-red-600"
                          title="Delete Course"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
