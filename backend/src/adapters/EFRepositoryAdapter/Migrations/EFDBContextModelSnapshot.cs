﻿// <auto-generated />
using System;
using EFRepositoryAdapter.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EFRepositoryAdapter.Migrations
{
    [DbContext(typeof(EFDBContext))]
    partial class EFDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EFRepositoryAdapter.DataModel.Model.IssueEFModel", b =>
                {
                    b.Property<Guid>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Childs")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("FatherGuid")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("OwnerGuid")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Guid");

                    b.ToTable("IssueSet");
                });

            modelBuilder.Entity("EFRepositoryAdapter.DataModel.Model.IssueListModel", b =>
                {
                    b.Property<Guid>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("IssueGuid")
                        .HasColumnType("char(36)");

                    b.Property<string>("Issues")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Guid");

                    b.ToTable("IssueListSet");
                });

            modelBuilder.Entity("EFRepositoryAdapter.DataModel.Model.UserModel", b =>
                {
                    b.Property<Guid>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Sub")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Guid");

                    b.ToTable("UserSet");
                });
#pragma warning restore 612, 618
        }
    }
}
