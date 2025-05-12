import React, { useState, useEffect, useMemo } from "react";
import styles from "./Members.module.css";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Trash, Edit, X } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage, Head } from '@inertiajs/react';
import 'react-data-grid/lib/styles.css';
import { DataGrid, SelectColumn } from 'react-data-grid';
import PaginatedDataGrid from "@/Components/PaginatedDataGrid";



const Students = () => {
    const { students } = usePage().props;
    const [rows, setRows] = useState([]);
    const [filters, setFilters] = useState({
        student_id: '',
        student_name: '',
        gender: 'All',
        email: '',
    });
    const [showFilters, setShowFilters] = useState(false);
    const stopPropagation = (e) => e.stopPropagation();

    useEffect(() => {
        setRows(students);
    }, [students]);


    const columns = [
        SelectColumn,
        {
            key: 'student_id', name: 'Student ID', sortable: true,
            width: 80,
            headerCellClass: 'flex flex-col items-center justify-center p-2 h-full',
            renderHeaderCell: ({ column }) => (
                <>
                    {/* 1) Column title */}
                    <div className="font-semibold text-center">
                        {column.name}
                    </div>
                    {/* 2) Filter row (shown only when toggled) */}
                    {showFilters && (
                        <input
                            className="mt-1 w-full border rounded-xs px-2 py-1 text-sm"
                            placeholder="Filter ID…"
                            value={filters.student_id}
                            onChange={e =>
                                setFilters(f => ({ ...f, student_id: e.target.value }))
                            }
                            onClick={stopPropagation}
                            onMouseDown={stopPropagation}
                        />
                    )}

                </>
            )
        },
        {
            key: 'student_name', name: 'Student Name', sortable: true,
            headerCellClass: 'filter-column',
            renderHeaderCell: ({ column }) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {column.name}
                    </div>
                    {showFilters && (
                        <input
                            style={{ width: '100%', marginTop: 4, padding: '2px 4px' }}
                            placeholder="Filter Name…"
                            value={filters.student_name}
                            onChange={e =>
                                setFilters(f => ({ ...f, student_name: e.target.value }))
                            }
                            onClick={stopPropagation}
                            onMouseDown={stopPropagation}
                        />
                    )}
                </div>
            )

        },
        {
            key: 'gender',
            name: 'Gender',
            sortable: true,
            headerCellClass: 'filter-column',
            renderHeaderCell: ({ column }) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {column.name}
                    </div>
                    {showFilters && (
                        <select
                            style={{ width: '100%', marginTop: 4, padding: '2px 4px' }}
                            value={filters.gender}
                            onChange={e =>
                                setFilters(f => ({ ...f, gender: e.target.value }))
                            }
                            onClick={stopPropagation}
                            onMouseDown={stopPropagation}
                        >
                            <option value="All">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    )}
                </div>
            ),
            renderCell: ({ row }) => {
                if (row.gender.toLowerCase() === 'female') {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FemaleIcon style={{ color: '#ff69b4' }} />
                            Female
                        </span>
                    );
                } else if (row.gender.toLowerCase() === 'male') {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MaleIcon style={{ color: '#007bff' }} />
                            Male
                        </span>
                    );
                } else {
                    return <span>{row.gender}</span>;
                }
            },


        },
        { key: 'email', name: 'Email', sortable: true },
        { key: 'enrolled_date', name: 'Enrolled Date', sortable: true },
        { key: 'status', name: 'Status', sortable: true },
        { key: 'contact_number', name: 'Contact Number', sortable: true },
        { key: 'date_of_birth', name: 'Date of Birth', sortable: true },
        { key: 'parent_name', name: 'Parent Name', sortable: true },
        {
            key: 'actions',
            name: 'Actions',
            // frozen: true,
            renderCell: ({ row }) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(row)}>
                        <Edit />
                    </button>
                    <button onClick={() => handleDelete(row)}>
                        <Trash />
                    </button>
                </div>
            )
        },
    ];

    const [members, setMembers] = useState({ membersDetails: [], membersCount: 0 });

    // For Add New Member
    const [isModalOpen, setModalOpen] = useState(false);


    const openModal = () => {
        setStep(1);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            gender: "",
            dob: "",
            height: "",
            weight: "",
            membershipPlan: "",
            fitnessGoals: "",
            trainerId: "",
        });
    };




    // For Delete Member
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeleteClick = (user_id = null) => {
        let selectedMembersIds;

        if (user_id) {
            selectedMembersIds = [user_id];
        } else {
            selectedMembersIds = Object.keys(selectedMembers).filter(id => selectedMembers[id]);

            if (selectedMembersIds.length === 0) {
                alert("Please select at least one member to delete.");
                return;
            }
        }
        setMembersToDelete(selectedMembersIds);
        setShowDeleteConfirm(true);
    };


    // For Edit Member Details
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setMemberInfo(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setMemberInfo(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <Head title="Students" />
            <div className="px-4 py-2 overflow-x-auto">
                <div className="">
                    {/* table tools */}
                    <div className="flex flex-row-reverse">
                        <div className=" flex gap-2">
                            <button
                                className=""
                                onClick={() => setShowFilters(f => !f)}
                            >
                                {showFilters ? <FilterAltOffIcon style={{ color: 'white', fontSize: "1.5rem" }} /> : 
                                <FilterAltIcon style={{ color: 'white', fontSize: "1.5rem" }} />}
                                
                            </button>
                            <button className="border bg-[white] text-[#1a1a1a] transition-[0.3s] px-3 text-sm
                        py-1 rounded border-[none] hover:bg-[#d6d6d6]" onClick={() => { }}>Add Student</button>
                            <button className="bg-[rgb(242,69,69)] text-[white] transition-[0.3s] text-sm
                        px-3 py-1 rounded border-[none] hover:bg-[red]" onClick={() => { }}>Delete Selected</button>
                        </div>
                    </div>

                    <h3 className="text-white font-semibold">All Students&nbsp;&nbsp;
                        <span className="font-light text-[#787878]">({members.membersCount})</span>
                    </h3>

                </div>
                <PaginatedDataGrid
                    columns={columns}
                    rows={rows}
                    rowKeyGetter={row => row.student_id}
                    style={{ height: '100%' }}
                    filters={filters}
                    setFilters={setFilters}
                    showFilters={showFilters}
                />



                {/* For Admin to Delete Member(Overlay) */}
                {showDeleteConfirm && (
                    <div className={styles.modalOverlayDeleteM}>
                        <div className={styles.modalDeleteM} style={{ textAlign: "center" }}>
                            <button className={styles.closeButton} onClick={() => setShowDeleteConfirm(false)}>
                                <X size={24} />
                            </button>
                            <Trash className={styles.deleteIcon} size={40} />
                            <p style={{ marginBottom: "30px" }}>Are you sure you want to delete this member?</p>
                            <div className={styles.modalButtons}>
                                <button className={styles.cancelDeleteButton} onClick={() => setShowDeleteConfirm(false)}>
                                    No, cancel
                                </button>
                                <button className={styles.confirmDeleteButton} onClick={handleDelete}>
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* For Admin to Add Member(Overlay) */}
                {isModalOpen && (
                    <div className={styles.overlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <PersonAddAlt1Icon className={styles.AddMemberIcon} />
                                <span className={styles.textstyle}>Add New Member</span>
                                <X className={styles.XButton} onClick={closeModal} />
                            </div>

                            <div className={styles.progressTabs}>
                                <div className={`${styles.tab} ${step === 1 ? styles.activeTab : styles.inactiveTab
                                    }`}
                                >
                                    Personal Information
                                </div>
                                <div className={`${styles.tab} ${step === 2 ? styles.activeTab : styles.inactiveTab
                                    }`}
                                >
                                    Fitness Goals
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.formContainer}>
                                <div className={styles.formGrid}>
                                    {step == 1 ? (
                                        <>
                                            <div className={styles.leftColumn}>
                                                <label className={styles.required}>Name:</label>
                                                <input type="text" name="name" placeholder="Name as per IC" value={formData.name} onChange={handleChange} required />

                                                <label className={styles.required}>Email:</label>
                                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

                                                <label className={styles.required}>Phone Number:</label>
                                                <input type="text" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleChange} required />

                                                <label className={styles.required}>Username:</label>
                                                <input type="text" name="username" placeholder="Set your username" value={formData.username} onChange={handleChange} required />

                                                <label className={styles.required}>Password:</label>
                                                <input type="password" name="password" placeholder="Set your password" value={formData.password} onChange={handleChange} required />
                                            </div>

                                            <div className={styles.rightColumn}>
                                                <label className={styles.genderContainer}>
                                                    <label className={`${styles.genderLabel} ${styles.required}`}>Gender:</label>
                                                    <div className={styles.radioGroup}>
                                                        <label className={styles.radioLabel}>
                                                            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange}
                                                            />
                                                            Male
                                                        </label>
                                                        <label className={styles.radioLabel}>
                                                            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange}
                                                            />
                                                            Female
                                                        </label>
                                                    </div>
                                                </label>

                                                <label className={styles.required}>Date of Birth:</label>
                                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                                <label>Profile Picture:</label>
                                                <input type="file" name="profilePicture" onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.fitnessGoals}>
                                            <div className={styles.heightWeightContainer}>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.required}>Height:</label>
                                                    <input type="number" name="height" placeholder="Enter Height" value={formData.height} onChange={handleChange} required />
                                                    <span className={styles.unit}>cm</span>
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label className={styles.required}>Weight:</label>
                                                    <input type="number" name="weight" placeholder="Enter weight" value={formData.weight} onChange={handleChange} required />
                                                    <span className={styles.unit}>kg</span>
                                                </div>
                                            </div>

                                            <label className={styles.required}>Membership Plan:</label>
                                            <select name="membershipPlan" value={formData.membershipPlan} onChange={handleChange} className={styles.addnmembershipDropdown} required
                                            >
                                                <option value="" disabled selected>Select Membership Plan</option>
                                                {membershipPlans.map((plan) => (
                                                    <option key={plan.membership_id} value={plan.membership_id}>{plan.plan_name}</option>
                                                ))}
                                            </select>

                                            {formData.membershipPlan === "2" || formData.membershipPlan === "4" ? (
                                                <>
                                                    <label className={styles.required}>Select Trainer:</label>
                                                    <select
                                                        name="trainerId"
                                                        value={formData.trainerId}
                                                        onChange={handleChange}
                                                        className={styles.addnmembershipDropdown}
                                                        required
                                                    >
                                                        <option value="" disabled>Select Trainer</option>
                                                        {trainers.map((trainer) => (
                                                            <option key={trainer.user_id} value={trainer.user_id}>
                                                                {trainer.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </>
                                            ) : null}

                                            <label className={styles.required}>What are your fitness goals?</label>
                                            <div className={styles.fitnessGoalsOption}>
                                                {["Lose Weight", "Muscle Mass Gain", "Gain Weight", "Shape Body", "Others"].map((goal) => (
                                                    <label key={goal} className={styles.goalOption}>
                                                        <input type="radio" name="fitnessGoals" value={goal} checked={formData.fitnessGoals == goal} onChange={handleChange} required
                                                        />
                                                        {goal}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.footerbutton}>
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            className={styles.cancelButton}
                                            onClick={() => setStep(step - 1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                    {step === 2 && (
                                        <button
                                            type="submit"
                                            className={styles.nextButton}
                                        >
                                            Submit
                                        </button>
                                    )}

                                    {step === 1 && (
                                        <button
                                            type="button"
                                            className={styles.nextButton}
                                            onClick={handleNextStep}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {isEditModalOpen && (
                    <div className={styles.editOverlay}>
                        <div className={styles.editContent}>
                            <X className={styles.closeButton} onClick={closeEditModal} />
                            <h2>Edit Member Information</h2>
                            <form onSubmit={(e) => handleSave(e, memberInfo)}>
                                <div className={styles.profileSection}>
                                    <img src={memberInfo.profile_picture ? `http://localhost:5000/uploads/${memberInfo.profile_picture}` : `http://localhost:5000/uploads/default.jpg`} alt="Profile" className={styles.profilePicture} />
                                    <div>
                                        <label>Username:</label>
                                        <input type="text" name="username" value={memberInfo.username} readOnly required />
                                    </div>
                                </div>
                                <hr className={styles.edithr} />
                                <h3 className={styles.edith3text}>Personal Information</h3>
                                <label>Name:</label>
                                <input type="text" name="name" value={memberInfo.name} onChange={handleEditChange} required />
                                <label>Gender:</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="gender" value="Male" checked={memberInfo.gender === "Male"} onChange={handleEditChange}
                                        />
                                        Male
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="gender" value="Female" checked={memberInfo.gender === "Female"} onChange={handleEditChange}
                                        />
                                        Female
                                    </label>
                                </div>
                                <label>Date of Birth:</label>
                                <input type="date" name="date_of_birth" value={new Date(memberInfo.date_of_birth).toLocaleDateString('en-CA')} onChange={handleEditChange} required />
                                <label>Email:</label>
                                <input type="email" name="email" value={memberInfo.email} onChange={handleEditChange} required />
                                <label>Phone Number:</label>
                                <input type="text" name="contact_number" value={memberInfo.contact_number} onChange={handleEditChange} required />
                                <hr className={styles.edithr} />
                                <h3 className={styles.edith3text}>Fitness Information</h3>
                                <div className={styles.heightWeightContainer}>
                                    <div className={styles.inputGroup}>
                                        <label>Height:</label>
                                        <input type="number" name="height" placeholder="Enter Height" value={memberInfo.height} onChange={handleEditChange} required />
                                        <span className={styles.unit}>cm</span>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Weight:</label>
                                        <input type="number" name="weight" placeholder="Enter weight" value={memberInfo.weight} onChange={handleEditChange} required />
                                        <span className={styles.unit}>kg</span>
                                    </div>
                                </div>
                                <label>Membership Plan:</label>
                                <select name="membership_id" value={memberInfo.membership_id} onChange={handleEditChange}>
                                    {membershipPlans.map((plan) => (
                                        <option key={plan.membership_id} value={plan.membership_id}>{plan.plan_name}</option>
                                    ))}
                                </select>

                                {memberInfo.membership_id === "2" || memberInfo.membership_id === "4" ? (
                                    <>
                                        <label>Select Trainer:</label>
                                        <select
                                            name="trainer_id"
                                            value={memberInfo.trainer_id}
                                            onChange={handleEditChange}
                                            className={styles.addnmembershipDropdown}
                                        >
                                            <option value="" disabled>Select Trainer</option>
                                            {trainers.map((trainer) => (
                                                <option key={trainer.user_id} value={trainer.user_id}>
                                                    {trainer.name}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                ) : null}

                                <label>Fitness goals:</label>
                                <div className={styles.fitnessGoalsOption}>
                                    {["Lose Weight", "Muscle Mass Gain", "Gain Weight", "Shape Body", "Others"].map((goal) => (
                                        <label key={goal} className={styles.goalOption}>
                                            <input type="radio" name="fitness_goals" value={goal} checked={memberInfo.fitness_goals == goal} onChange={handleEditChange} required
                                            />

                                            {goal}
                                        </label>
                                    ))}
                                </div>
                                <div className={styles.buttonSection}>
                                    <button type="button" onClick={closeEditModal} className={styles.cancelDeleteButton}>Cancel</button>
                                    <button type="submit" className={styles.confirmDeleteButton}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

Students.layout = page => <AppLayout>{page}</AppLayout>

export default Students;