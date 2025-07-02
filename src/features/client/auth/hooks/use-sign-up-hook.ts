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
    fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Địa chỉ email không hợp lệ"),
    phoneNumber: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
      .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
    password: z.string().min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
    confirmPassword: z.string().min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
    addressNo: z.string().min(1, "Số nhà là bắt buộc"),
    ward: z.string().min(1, "Phường/Xã là bắt buộc"),
    district: z.string().min(1, "Quận/Huyện là bắt buộc"),
    city: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
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
      phoneNumber: "",
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
        toast.error("Không thể tải tỉnh/thành phố");
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
          toast.error("Không thể tải quận/huyện");
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
          toast.error("Không thể tải phường/xã");
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
    const fullAddress = `${values.addressNo}, ${values.ward}, ${values.district}, ${values.city}`; // Prepare registration data
    const registrationData = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
      address: fullAddress,
    };
    register(registrationData)
      .unwrap()
      .then(() => {
        toast.success("Đăng ký thành công!");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Thông tin không hợp lệ hoặc người dùng đã tồn tại.");
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
