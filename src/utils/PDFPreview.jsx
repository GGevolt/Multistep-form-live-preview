import { Document, Page, Text, View, PDFViewer } from "@react-pdf/renderer"
import { useEffect, useRef } from "react";
import { createTw } from "react-pdf-tailwind";
import { useSelector } from "react-redux";

const tw = createTw({})

export default function PDFPreviewer() {

    const step1 = useSelector((state) => state.step1);
    const step2 = useSelector((state) => state.step2);
    const step3 = useSelector((state) => state.step3);

    const count = useRef(0);
    useEffect(() => {
        count.current++;
    }, [step1, step2, step3]);


    return (
        <div className="w-full h-full bg-gray-50 p-4 text-2xl">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                    <h2 className="text-xl font-bold">Travel Booking PDF Preview</h2>
                    <p className="text-blue-100 text-sm">Review your travel booking summary</p>
                </div>

                <div className="h-[calc(100vh-130px)]">
                    <PDFViewer width="100%" height="100%" key={count.current} showToolbar={true}>
                        <Document>
                            <Page size="A4" style={tw("flex flex-cols p-[30px] bg-white")}>
                                <Text style={tw("text-4xl text-center text-[#2563eb] font-bold")}>Travel Booking Summary</Text>

                                {step1 && step1.isCompleted &&
                                    <View style={tw("mb-5 p-3.5 bg-[#f9fafb] rounded-xl")}>
                                        <Text style={tw("text-2xl mb-2.5 text-[#1e40af] font-bold border-b border-b-[#d1d5db] pb-1.5")}>Personal Information</Text>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Name:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step1.name}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Email:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step1.email}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Phone:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step1.phoneNumber}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Date of Birth:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{new Date(step1.birth).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                }

                                {step2 && step2.isCompleted &&
                                    <View style={tw("mb-5 p-3.5 bg-[#f9fafb] rounded-xl")}>
                                        <Text style={tw("text-2xl mb-2.5 text-[#1e40af] font-bold border-b border-b-[#d1d5db] pb-1.5")}>Travel Details</Text>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Destination:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step2.country}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Travelers:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step2.travelers} person(s)</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Intensity:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step2.intensity.charAt(0).toUpperCase() + step2.intensity.slice(1)}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Activities:</Text>
                                            <View style={tw("flex-1 flex flex-row gap-10 flex-wrap")}>
                                                {step2.activities.map((activity, index) => (
                                                    <Text key={index} style={tw("text-lg ml-2.5 mb-1 text-[#6b7280]")}>
                                                        • {activity}
                                                    </Text>
                                                ))}
                                            </View>
                                        </View>
                                        {step2.note && <Text style={tw("text-lg italic mt-1.5 p-2.5 bg-[#f3f4f6] rounded-sm text-[#6b7280]")}>Note: {step2.note}</Text>}
                                    </View>
                                }

                                {step3 && step3.isCompleted &&
                                    <View style={tw("mb-5 p-3.5 bg-[#f9fafb] rounded-xl")}>
                                        <Text style={tw("text-2xl mb-2.5 text-[#1e40af] font-bold border-b border-b-[#d1d5db] pb-1.5")}>Booking Details</Text>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Budget:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>${step3.budget.toLocaleString()}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Accommodation:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step3.accommodation}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>WiFi Required:</Text>
                                            <Text style={tw("text-lg flex-1 text-[#6b7280]")}>{step3.wifi ? "Yes" : "No"}</Text>
                                        </View>
                                        <View style={tw("flex flex-row pb-2")}>
                                            <Text style={tw("text-lg font-bold text-[#374151] w-48")}>Transportation:</Text>
                                            <View style={tw("flex-1 flex flex-row gap-5 flex-wrap")}>
                                                {step3.transport.map((method, index) => (
                                                    <Text key={index} style={tw("text-lg ml-2.5 mb-1 text-[#6b7280]")}>
                                                        • {method}
                                                    </Text>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                }
                            </Page >
                        </Document >
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}

