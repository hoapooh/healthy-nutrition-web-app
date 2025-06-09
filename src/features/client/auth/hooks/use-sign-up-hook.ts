import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/services/auth-services";
import { useRouter } from "next/navigation";
import {
  provincesApi,
  Province,
  District,
  Ward,
} from "@/services/provinces-services";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    confirmPassword: z
      .string()
      .min(3, "Password must be at least 3 characters long"),
    addressNo: z.string().min(1, "Address number is required"),
    ward: z.string().min(1, "Ward is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const useSignUpHook = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  // Address related state
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      addressNo: "",
      ward: "",
      district: "",
      city: "",
    },
  });

  // Load provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await provincesApi.getProvinces();

        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
        toast.error("Failed to load provinces");
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);
  // Load districts when city changes
  const watchCity = form.watch("city");
  useEffect(() => {
    if (watchCity) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          // Find the province code by the selected city name
          const selectedProvince = provinces.find((p) => p.name === watchCity);
          if (selectedProvince) {
            const data = await provincesApi.getDistricts(selectedProvince.code);
            setDistricts(data);
            // Reset district and ward when city changes
            form.setValue("district", "");
            form.setValue("ward", "");
            setWards([]);
          }
        } catch (error) {
          console.error("Failed to fetch districts:", error);
          toast.error("Failed to load districts");
        } finally {
          setLoadingDistricts(false);
        }
      };

      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [watchCity, form, provinces]);
  // Load wards when district changes
  const watchDistrict = form.watch("district");
  useEffect(() => {
    if (watchDistrict) {
      const fetchWards = async () => {
        setLoadingWards(true);
        try {
          // Find the district code by the selected district name
          const selectedDistrict = districts.find(
            (d) => d.name === watchDistrict,
          );
          if (selectedDistrict) {
            const data = await provincesApi.getWards(selectedDistrict.code);
            setWards(data);
            // Reset ward when district changes
            form.setValue("ward", "");
          }
        } catch (error) {
          console.error("Failed to fetch wards:", error);
          toast.error("Failed to load wards");
        } finally {
          setLoadingWards(false);
        }
      };

      fetchWards();
    } else {
      setWards([]);
    }
  }, [watchDistrict, form, districts]);
  function onSubmit(values: FormValues) {
    // Since we're now storing names directly, we can use them as-is
    const fullAddress = `${values.addressNo}, ${values.ward}, ${values.district}, ${values.city}`;

    // Prepare registration data
    const registrationData = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: "",
      address: fullAddress,
    };

    register(registrationData)
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Registration successful!");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Invalid credentials or user already exists.");
      });
  }

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return {
    form,
    onSubmit,
    isLoading,
    passwordVisibility,
    togglePasswordVisibility,
    // Address related data
    provinces,
    districts,
    wards,
    loadingProvinces,
    loadingDistricts,
    loadingWards,
  };
};

export default useSignUpHook;
