﻿// <auto-generated />
using System;
using DesiresAPI.BL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DesiresAPI.BL.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DesiresAPI.BL.DayDesire", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DayRecordId")
                        .HasColumnType("int");

                    b.Property<int?>("DesireId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DayRecordId");

                    b.HasIndex("DesireId");

                    b.ToTable("DayDesire");
                });

            modelBuilder.Entity("DesiresAPI.BL.DayRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("DayRecords");
                });

            modelBuilder.Entity("DesiresAPI.BL.Desire", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Desires");
                });

            modelBuilder.Entity("DesiresAPI.BL.Option", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DesireId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DesireId");

                    b.ToTable("Option");
                });

            modelBuilder.Entity("DesiresAPI.BL.DayDesire", b =>
                {
                    b.HasOne("DesiresAPI.BL.DayRecord", null)
                        .WithMany("DayDesires")
                        .HasForeignKey("DayRecordId");

                    b.HasOne("DesiresAPI.BL.Desire", "Desire")
                        .WithMany()
                        .HasForeignKey("DesireId");
                });

            modelBuilder.Entity("DesiresAPI.BL.Option", b =>
                {
                    b.HasOne("DesiresAPI.BL.Desire", null)
                        .WithMany("Options")
                        .HasForeignKey("DesireId");
                });
#pragma warning restore 612, 618
        }
    }
}
