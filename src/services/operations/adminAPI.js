import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
  GET_ALL_USERS_API,
  CREATE_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API,
  GET_ALL_COURSES_API,
  APPROVE_COURSE_API,
  DELETE_COURSE_API,
  GET_ANALYTICS_API,
} = adminEndpoints;

// ================ USER MANAGEMENT ================
export const getAllUsers = async (token) => {
  const toastId = toast.loading("Loading users...");
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch users");
    }

    toast.success("Users fetched successfully");
    return response.data.users;
  } catch (error) {
    console.log("GET_ALL_USERS_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not fetch users");
    return [];
  } finally {
    toast.dismiss(toastId);
  }
};

export const createUser = async (userData, token) => {
  const toastId = toast.loading("Creating user...");
  try {
    const response = await apiConnector("POST", CREATE_USER_API, userData, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (!response?.data?.success) {
      throw new Error("Could not create user");
    }

    toast.success("User created successfully");
    return response.data.user;
  } catch (error) {
    console.log("CREATE_USER_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not create user");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateUser = async (userId, userData, token) => {
  const toastId = toast.loading("Updating user...");
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_USER_API.replace(":userId", userId),
      userData,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update user");
    }

    toast.success("User updated successfully");
    return response.data.user;
  } catch (error) {
    console.log("UPDATE_USER_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not update user");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteUser = async (userId, token) => {
  const toastId = toast.loading("Deleting user...");
  try {
    // Validate inputs
    if (!userId || !token) {
      throw new Error("Missing required parameters");
    }

    // Log the request details
    console.log('Delete User Request:', {
      userId,
      tokenExists: !!token,
      url: DELETE_USER_API.replace(":userId", userId)
    });

    // Prepare headers with token
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Make the API call
    const response = await apiConnector(
      "DELETE",
      DELETE_USER_API.replace(":userId", userId),
      null,
      headers
    );

    // Log the response
    console.log('Delete User Response:', {
      status: response.status,
      success: response.data?.success,
      message: response.data?.message
    });

    // Check for successful response
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete user");
    }

    // Show success message
    toast.success("User deleted successfully");
    return true;

  } catch (error) {
    // Enhanced error logging
    console.error("Delete User Error:", {
      name: error.name,
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      }
    });

    // Show error message to user
    toast.error(error.response?.data?.message || "Could not delete user");
    throw error;

  } finally {
    toast.dismiss(toastId);
  }
};

// ================ COURSE MANAGEMENT ================
export const getAllCourses = async (token) => {
  const toastId = toast.loading("Loading courses...");
  try {
    const response = await apiConnector("GET", GET_ALL_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch courses");
    }

    toast.success("Courses fetched successfully");
    return response.data.courses;
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not fetch courses");
    return [];
  } finally {
    toast.dismiss(toastId);
  }
};

export const approveCourse = async (courseId, token) => {
  const toastId = toast.loading("Approving course...");
  try {
    const response = await apiConnector(
      "PUT",
      APPROVE_COURSE_API.replace(":courseId", courseId),
      null,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not approve course");
    }

    toast.success("Course approved successfully");
    return response.data.course;
  } catch (error) {
    console.log("APPROVE_COURSE_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not approve course");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Deleting course...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COURSE_API.replace(":courseId", courseId),
      null,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not delete course");
    }

    toast.success("Course deleted successfully");
    return true;
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not delete course");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// ================ ANALYTICS ================
export const getAnalytics = async (token) => {
  const toastId = toast.loading("Loading analytics...");
  try {
    const response = await apiConnector("GET", GET_ANALYTICS_API, null, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch analytics");
    }

    toast.success("Analytics fetched successfully");
    return response.data.analytics;
  } catch (error) {
    console.log("GET_ANALYTICS_API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not fetch analytics");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
